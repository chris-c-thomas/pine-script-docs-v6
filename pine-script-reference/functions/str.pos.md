---
title: "str.pos()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_str.pos"
category: "Functions"
---

# str.pos()

Returns the position of the first occurrence of the `str` string in the `source` string, 'na' otherwise.

## Syntax & Overloads

```
str.pos(source, str) → const int
```

```
str.pos(source, str) → simple int
```

```
str.pos(source, str) → series int
```

## Arguments

**source (const string)** Source string.

**str (const string)** The substring to search for.

## Returns

Position of the `str` string in the `source` string.

## Remarks

Strings indexing starts at 0.

## See also

- [str.contains()](https://www.tradingview.com/pine-script-reference/v6/#fun_str.contains)
- [str.match()](https://www.tradingview.com/pine-script-reference/v6/#fun_str.match)
- [str.substring()](https://www.tradingview.com/pine-script-reference/v6/#fun_str.substring)
