---
title: "array.last()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_array.last"
category: "Functions"
---

# array.last()

Returns the array's last element. Throws a runtime error if the array is empty.

## Syntax

```
array.last(id) → series <type>
```

## Arguments

**id (any array type)** An array object.

## Example

```pine
//@version=6
indicator("array.last example")
arr = array.new_int(3, 10)
plot(array.last(arr))
```

## See also

- [array.first()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.first)
- [array.get()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.get)
