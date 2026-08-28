import assert from 'node:assert/strict';
import test from 'node:test';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

(globalThis as typeof globalThis & { React: typeof React }).React = React;

test('Microsoft Clarity renders a valid loader for the configured project', async () => {
  const analyticsModule = await import('../components/analytics/MicrosoftClarity').catch(() => null);

  assert.ok(analyticsModule, 'the Microsoft Clarity integration must be available');

  const markup = renderToStaticMarkup(React.createElement(analyticsModule.MicrosoftClarity));

  assert.match(markup, /id="microsoft-clarity"/);
  assert.match(markup, /https:\/\/www\.clarity\.ms\/tag\//);
  assert.match(markup, /y9a7dkhmoc/);
  assert.doesNotMatch(markup, /\[https:\/\/www\.clarity\.ms\/tag\/\]/);
});
