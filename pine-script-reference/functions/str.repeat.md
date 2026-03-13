---
title: "str.repeat()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_str.repeat"
category: "Functions"
---

# str.repeat()

Constructs a new string containing the `source` string repeated `repeat` times with the `separator` injected between each repeated instance.

## Syntax & Overloads

```
str.repeat(source, repeat, separator) → const string
```

```
str.repeat(source, repeat, separator) → input string
```

```
str.repeat(source, repeat, separator) → simple string
```

```
str.repeat(source, repeat, separator) → series string
```

## Arguments

**source (const string)** String to repeat.

**repeat (const int)** Number of times to repeat the `source` string. Must be greater than or equal to 0.

**separator (const string)** String to inject between repeated values. Optional. The default is empty string.

## Example

```pine
//@version=6
indicator("str.repeat")
repeat = str.repeat("?", 3, ",") // Returns "?,?,?"
label.new(bar_index,close,repeat)
```

## Remarks

Returns [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) if the `source` is [na](https://www.tradingview.com/pine-script-reference/v6/#var_na).
