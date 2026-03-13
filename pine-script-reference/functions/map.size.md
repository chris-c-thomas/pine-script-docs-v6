---
title: "map.size()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_map.size"
category: "Functions"
---

# map.size()

Returns the number of key-value pairs in the `id` map.

## Syntax

```
map.size(id) → series int
```

## Arguments

**id (any map type)** A map object.

## Example

```pine
//@version=6
indicator("map.size example")
a = map.new<int, int>()
size = 10
for i = 0 to size
    a.put(i, size-i)
plot(map.size(a))
```

## See also

- [map.new\<type,type>()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.new<type,type>)
- [map.put()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.put)
- [map.keys()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.keys)
- [map.values()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.values)
- [map.get()](https://www.tradingview.com/pine-script-reference/v6/#fun_map.get)
