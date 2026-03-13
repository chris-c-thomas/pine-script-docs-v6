---
title: "str.contains()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_str.contains"
category: "Functions"
---

# str.contains()

Returns true if the `source` string contains the `str` substring, false otherwise.

## Syntax & Overloads

```
str.contains(source, str) → const bool
```

```
str.contains(source, str) → simple bool
```

```
str.contains(source, str) → series bool
```

## Arguments

**source (const string)** Source string.

**str (const string)** The substring to search for.

## Example

```pine
//@version=6
indicator("str.contains")
// If the current chart is a continuous futures chart, e.g “BTC1!”, then the function will return true, false otherwise.
var isFutures = str.contains(syminfo.tickerid, "!")
plot(isFutures ? 1 : 0)
```

## Returns

True if the `str` was found in the `source` string, false otherwise.

## See also

- [str.pos()](https://www.tradingview.com/pine-script-reference/v6/#fun_str.pos)
- [str.match()](https://www.tradingview.com/pine-script-reference/v6/#fun_str.match)
