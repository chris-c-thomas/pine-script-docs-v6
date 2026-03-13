---
title: "math.round()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_math.round"
category: "Functions"
---

# math.round()

Returns the value of `number` rounded to the nearest integer, with ties rounding up. If the `precision` parameter is used, returns a float value rounded to that amount of decimal places.

## Syntax & Overloads

```
math.round(number) → const int
```

```
math.round(number) → input int
```

```
math.round(number) → simple int
```

```
math.round(number) → series int
```

```
math.round(number, precision) → const float
```

```
math.round(number, precision) → input float
```

```
math.round(number, precision) → simple float
```

```
math.round(number, precision) → series float
```

## Arguments

**number (const int/float)** The value to be rounded.

## Returns

The value of `number` rounded to the nearest integer, or according to precision.

## Remarks

Note that for 'na' values function returns 'na'.

## See also

- [math.ceil()](https://www.tradingview.com/pine-script-reference/v6/#fun_math.ceil)
- [math.floor()](https://www.tradingview.com/pine-script-reference/v6/#fun_math.floor)
