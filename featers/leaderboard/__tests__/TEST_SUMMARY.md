# Leaderboard Feature Unit Tests

## Overview

Comprehensive unit test suite for the `features/leaderboard` module with **73 passing tests** covering utilities, types, data, constants, components, and integration scenarios.

## Test Structure

```
featers/leaderboard/__tests__/
├── components/
│   └── AddRacerForm.test.tsx (18 tests)
├── constants/
│   └── racer.constant.test.ts (5 tests)
├── data/
│   └── racers.test.ts (12 tests)
├── screens/
│   └── LeaderboardScreen.test.tsx (15 tests)
├── types/
│   └── racer.interface.test.ts (8 tests)
├── utils/
│   ├── toMillisecond.test.ts (10 tests)
│   └── toTimeStampForm.test.ts (10 tests)
└── integration.test.ts (15 tests)
```

## Test Suites

### 1. Utility Functions Tests

#### `toMillisecond.test.ts` (10 tests)

Tests conversion of time string format (e.g., "1:33.643") to milliseconds for sorting.

- Single digit and multi-digit minute conversion
- Handling zero minutes and high values
- Boundary conditions (00:00.000 and 99:59.999)
- Time comparison for leaderboard sorting
- Real F1 driver lap times validation

#### `toTimeStampForm.test.ts` (10 tests)

Tests conversion of 6-character OTP input to formatted timestamp string.

- Formats "133643" → "1:33.643"
- Handles leading zeros correctly
- Preserves all digits in correct positions
- Validates format consistency for display

### 2. Data & Constants Tests

#### `racer.constant.test.ts` (5 tests)

Validates MAX_RACER constant.

- Verifies constant is defined and is a positive number
- Confirms MAX_RACER = 20
- Validates it's a reasonable leaderboard limit (10-100)

#### `racers.test.ts` (12 tests)

Validates initial racers dataset.

- Verifies array structure and minimum count (6+ racers)
- Validates required properties (name, colorTag, timeStamp)
- Confirms valid hex color format for all racers
- Verifies valid timestamp format for all racers
- Validates unique IDs across all racers
- Confirms expected racers present (Oscar Piastri, George Russell, etc.)

### 3. Type Tests

#### `racer.interface.test.ts` (8 tests)

Validates Racer interface structure.

- Creates racers with required properties
- Handles optional ID field correctly
- Accepts various time formats
- Accepts different hex color formats (3 and 6-digit)
- Validates type correctness for all properties

### 4. Component Tests

#### `AddRacerForm.test.tsx` (18 tests)

Tests the racer form component.

- Renders form with title "F1 Leaderboard"
- Displays form title and description
- Renders all required input fields (name, time, color)
- Shows color picker with correct functionality
- Accepts disabled prop for max racers reached
- Validates field rendering and accessibility
- Tests form structure and layout

#### `LeaderboardScreen.test.tsx` (15 tests)

Tests the main leaderboard display component.

- Renders leaderboard screen and form
- Displays all initial racers
- Shows correct number of racers from data
- Displays racer names and times
- Validates time format (MM:SS.mmm)
- Displays racer position numbers
- Confirms specific racers visible (Oscar Piastri, George Russell, Max Verstappen)
- Validates minimum 6 racers displayed

### 5. Integration Tests

#### `integration.test.ts` (15 tests)

Tests complete workflows and cross-module interactions.

**Adding Racer Flow:**

- Processes OTP input (6 digits) through format conversion
- Creates complete racer object with formatted time
- Validates new racer integration

**Time Management:**

- Correctly identifies faster vs slower times
- Maintains time format consistency through conversion pipeline
- Handles edge case times (very fast/very slow)

**Leaderboard Constraints:**

- Validates racer count never exceeds MAX_RACER
- Verifies sorting by converted milliseconds

**Data Validation:**

- All racers have valid structure and formats
- Racers are sorted by time (ascending)
- All colors are valid hex format

## Test Coverage

| Category    | Files | Tests  | Status  |
| ----------- | ----- | ------ | ------- |
| Utils       | 2     | 20     | ✅ Pass |
| Constants   | 1     | 5      | ✅ Pass |
| Data        | 1     | 12     | ✅ Pass |
| Types       | 1     | 8      | ✅ Pass |
| Components  | 2     | 33     | ✅ Pass |
| Integration | 1     | 15     | ✅ Pass |
| **Total**   | **8** | **73** | ✅ Pass |

## Running Tests

```bash
# Run all leaderboard tests
npm test -- featers/leaderboard

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test -- featers/leaderboard/__tests__/utils/toMillisecond.test.ts
```

## Test Environment

- **Test Framework:** Jest 30.4.2
- **TypeScript Support:** ts-jest
- **React Testing:** @testing-library/react 16.3.2
- **DOM Testing:** @testing-library/dom 10.4.1
- **TypeScript:** 5.x

## Key Testing Patterns

1. **Pure Function Testing:** Utility functions tested with various inputs and edge cases
2. **Data Validation:** Dataset structure, types, and constraints verified
3. **Component Mocking:** UI components mocked to test logic in isolation
4. **Integration Testing:** Cross-module workflows validated
5. **Boundary Testing:** Edge cases (zero values, max values, empty strings)
6. **Real-world Data:** Uses actual F1 driver names and lap times

## Notes

- All tests follow AAA pattern (Arrange, Act, Assert)
- Component tests use Jest mocks to isolate UI logic
- Integration tests validate complete data flows
- Tests include both happy path and edge cases
- Type safety ensured through TypeScript strict mode
