import Ember from 'ember';
import { macroCondition, importSync, dependencySatisfies } from '@embroider/macros';
let getComponentManager;
if (macroCondition(dependencySatisfies('ember-source', '>=3.27.0-alpha.1'))) {
  let _getComponentManager =
  //@ts-ignore
  importSync('@glimmer/manager').getInternalComponentManager;
  getComponentManager = (definition, owner) => {
    return _getComponentManager(definition, true);
  };
} else if (macroCondition(dependencySatisfies('ember-source', '>=3.25.0-beta.1'))) {
  let _getComponentManager = Ember.__loader.require('@glimmer/manager').getInternalComponentManager;
  getComponentManager = (definition, owner) => {
    return _getComponentManager(definition, true);
  };
} else {
  let _getComponentManager = Ember.__loader.require('@glimmer/runtime').getComponentManager;
  getComponentManager = (definition, owner) => {
    return _getComponentManager(owner, definition);
  };
}
export default getComponentManager;