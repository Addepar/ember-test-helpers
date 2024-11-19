import { unsetContext } from './setup-context';
import Ember from 'ember';
import { Promise } from './-utils';
import settled, { _teardownAJAXHooks } from './settled';
import { _cleanupOnerror } from './setup-onerror';
import { destroy } from '@ember/destroyable';

/**
  Used by test framework addons to tear down the provided context after testing is completed.

  Responsible for:

  - un-setting the "global testing context" (`unsetContext`)
  - destroy the contexts owner object
  - remove AJAX listeners

  @public
  @param {Object} context the context to setup
  @param {Object} [options] options used to override defaults
  @param {boolean} [options.waitForSettled=true] should the teardown wait for `settled()`ness
  @returns {Promise<void>} resolves when settled
*/
export default function teardownContext(context, options) {
  let waitForSettled = true;
  if (options !== undefined && 'waitForSettled' in options) {
    waitForSettled = options.waitForSettled;
  }
  return Promise.resolve().then(() => {
    _cleanupOnerror(context);
    _teardownAJAXHooks();

    // SAFETY: this is intimate API *designed* for us to override.
    Ember.testing = false;
    unsetContext();
    destroy(context.owner);
  }).finally(() => {
    if (waitForSettled) {
      return settled();
    }
    return;
  });
}