---
title: "str.tonumber()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_str.tonumber"
category: "Functions"
---

# str.tonumber()

Converts a value represented in `string` to its "float" equivalent.

## Syntax & Overloads

```
str.tonumber(string) → const float
```

```
str.tonumber(string) → input float
```

```
str.tonumber(string) → simple float
```

```
str.tonumber(string) → series float
```

## Arguments

**string (const string)** String containing the representation of an integer or floating point value.

## Returns

A "float" equivalent of the value in `string`. If the value is not a properly formed integer or floating point value, the function returns [na](https://www.tradingview.com/pine-script-reference/v6/#var_na).
