---
title: "str.trim()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_str.trim"
category: "Functions"
---

# str.trim()

Constructs a new string with all consecutive whitespaces and other control characters (e.g., “\n”, “\t”, etc.) removed from the left and right of the `source`.

## Syntax & Overloads

```
str.trim(source) → const string
```

```
str.trim(source) → input string
```

```
str.trim(source) → simple string
```

```
str.trim(source) → series string
```

## Arguments

**source (const string)** String to trim.

## Example

```pine
//@version=6
indicator("str.trim")
trim = str.trim("    abc    ") // Returns "abc"
label.new(bar_index,close,trim)
```

## Remarks

Returns an empty string ("") if the result is empty after the trim or if the `source` is [na](https://www.tradingview.com/pine-script-reference/v6/#var_na).
