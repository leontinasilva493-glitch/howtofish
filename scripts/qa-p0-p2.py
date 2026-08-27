import json
import sys
from playwright.sync_api import sync_playwright


BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3111"
ROUTES = [
    "/",
    "/bosses/pufferfish/",
    "/fixes/error-0x11c7/",
    "/fish/",
    "/achievements/",
    "/achievements/bean/",
]


def check_page(page, route, viewport):
    response = page.goto(f"{BASE}{route}", wait_until="networkidle")
    assert response and response.status == 200, f"{route} returned {response.status if response else 'no response'}"
    assert page.locator("h1").count() == 1, f"{route} must render one H1"
    assert page.locator('link[rel="canonical"]').count() == 1, f"{route} needs one canonical"
    has_overflow = page.evaluate(
        "document.documentElement.scrollWidth > document.documentElement.clientWidth + 1"
    )
    assert not has_overflow, f"{route} overflows at {viewport['width']}px"


def main():
    console_errors = []
    checked = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 1000})
        page = context.new_page()
        page.on("console", lambda message: console_errors.append(message.text) if message.type == "error" else None)
        page.on("pageerror", lambda error: console_errors.append(str(error)))

        page.goto(BASE, wait_until="networkidle")
        page.evaluate("localStorage.clear()")

        for route in ROUTES:
            check_page(page, route, {"width": 1440, "height": 1000})
            checked.append({"route": route, "viewport": 1440})

        page.goto(f"{BASE}/fish/", wait_until="networkidle")
        page.locator(".database-search input").fill("Pufferfish")
        assert page.locator("tbody tr").count() == 1, "Fish search must narrow to Pufferfish"
        page.locator(".database-search input").fill("")
        page.get_by_role("button", name="Mini-boss").click()
        assert page.locator("tbody tr").count() == 4, "Mini-boss filter must show four cross-checked encounters"
        page.locator("tbody tr label.creature-check").first.click()
        page.reload(wait_until="networkidle")
        assert page.locator("tbody tr input[type=checkbox]:checked").count() == 1, "Fish progress must persist locally"

        page.goto(f"{BASE}/achievements/", wait_until="networkidle")
        page.locator(".data-search input").fill("Bean")
        assert page.locator(".achievement-row").count() == 1, "Achievement search must narrow to Bean"
        page.locator(".achievement-row .achievement-toggle").click()
        page.reload(wait_until="networkidle")
        assert page.locator(".achievement-row input[type=checkbox]:checked").count() == 1, "Achievement progress must persist locally"

        page.goto(BASE, wait_until="networkidle")
        for href in [
            "/bosses/pufferfish/",
            "/fixes/leeches-not-spawning/",
            "/fixes/missing-radar/",
            "/fixes/multiplayer-black-screen/",
            "/fixes/save-autosave/",
            "/achievements/bean/",
        ]:
            assert page.locator(f'a[href="{href}"]').count() >= 1, f"Homepage missing {href}"

        mobile = browser.new_page(viewport={"width": 390, "height": 844})
        mobile.on("console", lambda message: console_errors.append(message.text) if message.type == "error" else None)
        mobile.on("pageerror", lambda error: console_errors.append(str(error)))
        for route in ["/", "/fish/", "/achievements/", "/fixes/multiplayer-black-screen/"]:
            check_page(mobile, route, {"width": 390, "height": 844})
            checked.append({"route": route, "viewport": 390})

        browser.close()

    assert not console_errors, "Browser console errors: " + " | ".join(console_errors)
    print(json.dumps({"base": BASE, "pages_checked": checked, "console_errors": 0, "interactions": 4}, ensure_ascii=False))


if __name__ == "__main__":
    main()
