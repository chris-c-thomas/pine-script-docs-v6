---
title: "array.min()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_array.min"
category: "Functions"
---

# array.min()

The function returns the smallest value, or the nth smallest value in a given array.

## Syntax & Overloads

```
array.min(id, nth) → series float
```

```
array.min(id, nth) → series int
```

## Arguments

**id (array\<int/float>)** An array object.

**nth (series int)** The nth smallest value to return, where zero is the smallest. Optional. The default is zero.

## Example

```pine
//@version=6
indicator("array.min")
a = array.from(5, -2, 0, 9, 1)
secondLowest = array.min(a, 1) // 0
plot(secondLowest)
```

## Returns

The smallest or the nth smallest value in the array.

## Remarks

Returns [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) if the `id` array is empty.

## See also

- [array.new_float()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.new_float)
- [array.max()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.max)
- [array.sum()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.sum)
