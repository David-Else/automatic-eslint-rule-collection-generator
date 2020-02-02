import { assertEquals } from '../deps.ts';
import { test, runTests } from '../deps.ts';
import { ruleFilter, conditions } from '../src/mod.ts';

test({
  name: 'turned off rules removed',
  fn(): void {
    // Arrange
    const testData = {
      'turned off rule': ['off']
    };
    // Act
    const filteredRules = ruleFilter(testData, conditions);
    // Assert
    assertEquals(filteredRules, [{}, ['turned off rule']]);
  }
});

test({
  name: 'import plugin rules removed',
  fn(): void {
    // Arrange
    const testData = {
      'import/': ['on']
    };
    // Act
    const filteredRules = ruleFilter(testData, conditions);
    // Assert
    assertEquals(filteredRules, [{}, ['import/']]);
  }
});

test({
  name: 'various rules removed',
  fn(): void {
    // Arrange
    const testData = {
      '1': ['on'],
      'import/': ['on'],
      '2': ['off'],
      '3': ['on']
    };
    // Act
    const filteredRules = ruleFilter(testData, conditions);
    // Assert
    assertEquals(filteredRules, [
      {
        '1': ['on'],
        '3': ['on']
      },
      ['2', 'import/']
    ]);
  }
});

runTests();

// deno test test/ --allow-env --allow-write --allow-net --allow-run
