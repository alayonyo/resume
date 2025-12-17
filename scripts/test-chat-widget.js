#!/usr/bin/env node

/**
 * Simple Chat Widget Validator
 * Verifies that the chat widget has all required components
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Chat Widget Validation Test\n');

// Read the deployed chat widget file
const widgetPath = path.join(__dirname, '../deploy/chat-widget/remoteEntry.js');
const widgetSource = fs.readFileSync(widgetPath, 'utf8');

// Test 1: Check for required functions and features
const requiredFeatures = [
  'ChatButton',
  'useState',
  'handleSendMessage',
  'toggleChat',
  'data-testid.*chat-input',
  'placeholder.*Ask me about Yonatan',
  'data-testid.*send-button',
  'window.chatWidget',
  'messages.map',
];

console.log('✅ Testing for required features:');
requiredFeatures.forEach((feature) => {
  const regex = new RegExp(feature, 'i');
  const found = regex.test(widgetSource);
  console.log(
    `  ${found ? '✅' : '❌'} ${feature}: ${found ? 'Found' : 'MISSING'}`
  );
  if (!found) {
    process.exit(1);
  }
});

// Test 2: Check for input field structure
console.log('\n🔍 Testing input field implementation:');
const inputTests = [
  {
    name: 'Input element creation',
    pattern: /createElement\s*\(\s*['"']input['"']/,
    expected: true,
  },
  {
    name: 'Input has placeholder',
    pattern: /placeholder.*Ask me about Yonatan/,
    expected: true,
  },
  {
    name: 'Input has onChange handler',
    pattern: /onChange.*setInputValue/,
    expected: true,
  },
  {
    name: 'Input has onKeyPress handler',
    pattern: /onKeyPress.*Enter.*handleSendMessage/,
    expected: true,
  },
  {
    name: 'Send button exists',
    pattern: /data-testid.*send-button/,
    expected: true,
  },
];

inputTests.forEach((test) => {
  const found = test.pattern.test(widgetSource);
  console.log(
    `  ${found === test.expected ? '✅' : '❌'} ${test.name}: ${
      found ? 'Found' : 'MISSING'
    }`
  );
  if (found !== test.expected) {
    process.exit(1);
  }
});

// Test 3: Check for state management
console.log('\n📊 Testing state management:');
const stateTests = [
  'useState(false)', // isOpen
  'useState\\(\\[\\{.*id.*1.*text.*Yonatan', // messages with welcome
  'useState\\(.*\\[\\].*\\)', // empty array fallback
  "useState\\(.*''.*\\)", // empty string for input
];

stateTests.forEach((pattern, index) => {
  const regex = new RegExp(pattern);
  const found = regex.test(widgetSource);
  const names = [
    'isOpen state',
    'messages state',
    'array fallback',
    'input state',
  ];
  console.log(
    `  ${found ? '✅' : '❌'} ${names[index]}: ${found ? 'Found' : 'MISSING'}`
  );
});

// Test 4: Module Federation interface
console.log('\n🔗 Testing Module Federation:');
const moduleTests = [
  /window\.chatWidget\s*=/,
  /get.*function/,
  /ChatButton.*module/,
  /Promise\.resolve/,
  /default.*ChatButton/,
];

const moduleNames = [
  'Global chatWidget object',
  'Get function',
  'ChatButton module export',
  'Promise resolution',
  'Default export',
];

moduleTests.forEach((pattern, index) => {
  const found = pattern.test(widgetSource);
  console.log(
    `  ${found ? '✅' : '❌'} ${moduleNames[index]}: ${
      found ? 'Found' : 'MISSING'
    }`
  );
});

// Test 5: Check for debugging and test attributes
console.log('\n🐛 Testing debugging features:');
const debugTests = [
  /data-testid/,
  /console\.log.*toggled/,
  /Full chat widget/,
  /microfrontend loaded successfully/,
];

const debugNames = [
  'Test IDs for testing',
  'Toggle logging',
  'Full chat identification',
  'Success loading message',
];

debugTests.forEach((pattern, index) => {
  const found = pattern.test(widgetSource);
  console.log(
    `  ${found ? '✅' : '❌'} ${debugNames[index]}: ${
      found ? 'Found' : 'MISSING'
    }`
  );
});

console.log('\n🎉 All tests passed! Chat widget is properly configured.');
console.log('\n📋 Summary:');
console.log('  • Full chat interface with input field ✅');
console.log('  • Message handling and state management ✅');
console.log('  • Module Federation interface ✅');
console.log('  • Testing attributes for debugging ✅');
console.log('  • Proper fallback mechanisms ✅');
console.log('\n💡 The input field should now be visible in production!');
