'use strict';
import path from 'path';
import {Base} from 'yeoman-generator';
import chalk from 'chalk';
import ngUtil from '../util';
import scriptBase from '../script-base.js';

class Generator extends Base {
  constructor(...args) {
    super(...args);

    scriptBase.call(this);
  }

  prompting() {
    var prompts = [{
      name: 'moduleName',
      message: 'What module name would you like to use?',
      default: `${this.scriptAppName}.${this.name}`,
      when: () => this.config.get('modulePrompt')
    }, {
      name: 'dir',
      message: 'Where would you like to create this component?',
      default: this.config.get('componentDirectory')
    }];

    return this.prompt(prompts).then(props => {
      this.scriptAppName = props.moduleName || this.scriptAppName;
      this.dir = path.join(props.dir, this.name);
    });
  }

  writing() {
    ngUtil.copyTemplates(this, 'component');
  }
}

module.exports = Generator;
