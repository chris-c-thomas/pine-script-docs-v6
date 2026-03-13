---
title: "array.max()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_array.max"
category: "Functions"
---

# array.max()

The function returns the greatest value, or the nth greatest value in a given array.

## Syntax & Overloads

```
array.max(id, nth) → series float
```

```
array.max(id, nth) → series int
```

## Arguments

**id (array\<int/float>)** An array object.

**nth (series int)** The nth greatest value to return, where zero is the greatest. Optional. The default is zero.

## Example

```pine
//@version=6
indicator("array.max")
a = array.from(5, -2, 0, 9, 1)
thirdHighest = array.max(a, 2) // 1
plot(thirdHighest)
```

## Returns

The greatest or the nth greatest value in the array.

## Remarks

Returns [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) if the `id` array is empty.

## See also

- [array.new_float()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.new_float)
- [array.min()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.min)
- [array.sum()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.sum)
