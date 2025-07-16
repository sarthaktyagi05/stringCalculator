# String Calculator – TDD Kata in React

This project is a complete implementation of the classic **String Calculator** using JavaScript with React and Vite. The solution follows the principles of **Test-Driven Development (TDD)**, with well-documented, incremental changes and corresponding test cases.

It includes:
- A robust `add()` function that handles all the edge cases described in the kata
- A user-friendly UI built with React to allow manual input and result display
- A complete Jest test suite covering all known edge cases
- GitHub Pages deployment for live demonstration 
- live demo-https://sarthaktyagi05.github.io/stringCalculator/

---

## Problem Overview

The calculator takes a string of numbers and returns their sum. It supports the following:

1. **Default Delimiters**: Comma `,` and newline `\n`
2. **Custom Delimiters**:  
   - Single character: `//;\n1;2`
   - Multiple delimiters: `//[*][%]\n1*2%3`
   - Multi-character delimiters: `//[***]\n1***2***3`
3. **Quoted Inputs**: Handles inputs like `"//;\n1;2","5"` as separate calls and sums them
4. **Ignores Numbers > 1000**: These are skipped from sum
5. **Negative Numbers**: Throws an error listing all negative values
6. **Call Count**: Tracks how many times the `add()` method is called

---

## Getting Started

To run this project locally, follow these steps:

```bash
git clone https://github.com/sarthaktyagi05/stringCalculator.git
cd stringCalculator
npm install
npm run dev
