export const sampleDoc = {
    "type": "doc",
    "content": [
        {
            "type": "heading",
            "attrs": {
                "level": 1
            },
            "content": [
                {
                    "type": "text",
                    "text": "Sum of Array in DSA (Data Structures & Algorithms)"
                }
            ]
        },
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "Summing all elements of an array is one of the most fundamental problems in "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "bold"
                        }
                    ],
                    "text": "DSA"
                },
                {
                    "type": "text",
                    "text": "."
                },
                {
                    "type": "hardBreak"
                },
                {
                    "type": "text",
                    "text": "Even though it looks simple, it helps you understand:"
                }
            ]
        },
        {
            "type": "bulletList",
            "content": [
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Array traversal"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Iteration patterns"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Time & space complexity"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Recursion basics"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Prefix sums (advanced concept"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Input:  [1, 2, 3, 4, 5]"
                                }
                            ]
                        },
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Output: 15"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "1 + 2 + 3 + 4 + 5 = 15"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "🚀 Approach 1: Using Loop (Iterative Method)"
                                }
                            ]
                        },
                        {
                            "type": "heading",
                            "attrs": {
                                "level": 3
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "🔹 Logic"
                                }
                            ]
                        },
                        {
                            "type": "orderedList",
                            "attrs": {
                                "start": 1,
                                "type": null
                            },
                            "content": [
                                {
                                    "type": "listItem",
                                    "content": [
                                        {
                                            "type": "paragraph",
                                            "content": [
                                                {
                                                    "type": "text",
                                                    "text": "Create a variable "
                                                },
                                                {
                                                    "type": "text",
                                                    "marks": [
                                                        {
                                                            "type": "code"
                                                        }
                                                    ],
                                                    "text": "sum = 0"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "type": "listItem",
                                    "content": [
                                        {
                                            "type": "paragraph",
                                            "content": [
                                                {
                                                    "type": "text",
                                                    "text": "Traverse the array"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "type": "listItem",
                                    "content": [
                                        {
                                            "type": "paragraph",
                                            "content": [
                                                {
                                                    "type": "text",
                                                    "text": "Add each element to "
                                                },
                                                {
                                                    "type": "text",
                                                    "marks": [
                                                        {
                                                            "type": "code"
                                                        }
                                                    ],
                                                    "text": "sum"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "type": "listItem",
                                    "content": [
                                        {
                                            "type": "paragraph",
                                            "content": [
                                                {
                                                    "type": "text",
                                                    "text": "Return "
                                                },
                                                {
                                                    "type": "text",
                                                    "marks": [
                                                        {
                                                            "type": "code"
                                                        }
                                                    ],
                                                    "text": "sum"
                                                }
                                            ]
                                        },
                                        {
                                            "type": "codeGroup",
                                            "attrs": {
                                                "languages": {
                                                    "python": "# Sum of array in Python\n\narr = [1, 2, 3, 4, 5]\n\ntotal = 0\nfor num in arr:\n    total += num\n\nprint(\"Sum of array:\", total)\n\n# OR using built-in function\nprint(\"Sum using built-in:\", sum(arr))",
                                                    "java": "public class SumOfArray {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n\n        int sum = 0;\n        for (int i = 0; i < arr.length; i++) {\n            sum += arr[i];\n        }\n\n        System.out.println(\"Sum of array: \" + sum);\n    }\n}\n",
                                                    "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[] = {1, 2, 3, 4, 5};\n    int n = sizeof(arr) / sizeof(arr[0]);\n\n    int sum = 0;\n    for(int i = 0; i < n; i++) {\n        sum += arr[i];\n    }\n\n    cout << \"Sum of array: \" << sum << endl;\n\n    return 0;\n}\n",
                                                    "javascript": "const arr = [1, 2, 3, 4, 5];\n\nlet sum = 0;\nfor (const num of arr) {\n  sum += num;\n}\n\nconsole.log(\"Sum of array:\", sum);\n"
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "type": "heading",
            "attrs": {
                "level": 1
            },
            "content": [
                {
                    "type": "text",
                    "text": "🎯 Edge Cases to Consider"
                }
            ]
        },
        {
            "type": "orderedList",
            "attrs": {
                "start": 1,
                "type": null
            },
            "content": [
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Empty array → return 0"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Negative numbers"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Large numbers (overflow in Java/C++)"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Single element array"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "type": "horizontalRule"
        },
        {
            "type": "heading",
            "attrs": {
                "level": 1
            },
            "content": [
                {
                    "type": "text",
                    "text": "🏆 Interview Follow-Up Questions"
                }
            ]
        },
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "Interviewers may extend this problem:"
                }
            ]
        },
        {
            "type": "orderedList",
            "attrs": {
                "start": 1,
                "type": null
            },
            "content": [
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Find sum of even numbers only"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Find prefix sum array"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Find subarray with given sum"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Find maximum subarray sum (Kadane’s Algorithm)"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "💡 Key Takeaways"
                                }
                            ]
                        },
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "✔ Array traversal is fundamental"
                                },
                                {
                                    "type": "hardBreak"
                                },
                                {
                                    "type": "text",
                                    "text": "✔ Time complexity analysis is important"
                                },
                                {
                                    "type": "hardBreak"
                                },
                                {
                                    "type": "text",
                                    "text": "✔ Recursion increases space complexity"
                                },
                                {
                                    "type": "hardBreak"
                                },
                                {
                                    "type": "text",
                                    "text": "✔ Prefix sum is powerful for optimization"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "type": "paragraph"
        }
    ]
}

export const sampleDoc2 = {
  type: "doc",
  content: [
    {
      type: "codeGroup",
      attrs: {
        languages: {
          python: `# Sum of array in Python

arr = [1, 2, 3, 4, 5]

total = 0
for num in arr:
    total += num

print("Sum of array:", total)

# OR using built-in function
print("Sum using built-in:", sum(arr))
`,
          java: `public class SumOfArray {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};

        int sum = 0;
        for (int i = 0; i < arr.length; i++) {
            sum += arr[i];
        }

        System.out.println("Sum of array: " + sum);
    }
}
`,
        },
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Write DSA article...",
        },
      ],
    },
  ],
};
