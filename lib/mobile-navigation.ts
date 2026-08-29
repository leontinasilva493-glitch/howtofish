export function completeNestedNavigation(closeSearch: () => void, closeParent?: () => void) {
  closeSearch();
  closeParent?.();
}
