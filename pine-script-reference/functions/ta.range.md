---
title: "ta.range()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_ta.range"
category: "Functions"
---

# ta.range()

Returns the difference between the min and max values in a series.

## Syntax & Overloads

```
ta.range(source, length) → series int
```

```
ta.range(source, length) → series float
```

## Arguments

**source (series int)** Series of values to process.

**length (series int)** Number of bars (length).

## Returns

The difference between the min and max values in the series.

## Remarks

`na` values in the `source` series are ignored; the function calculates on the `length` quantity of non-`na` values.
