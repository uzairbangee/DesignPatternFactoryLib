import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as DesignPattern from '../lib/design_pattern-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new DesignPattern.DesignPatternStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
