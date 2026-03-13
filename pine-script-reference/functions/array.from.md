---
title: "array.from()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_array.from"
category: "Functions"
---

# array.from()

The function takes a variable number of arguments with one of the types: int, float, bool, string, label, line, color, box, table, linefill, and returns an array of the corresponding type.

## Syntax & Overloads

```
array.from(arg0, arg1, ...) → array<type>
```

```
array.from(arg0, arg1, ...) → array<enum>
```

```
array.from(arg0, arg1, ...) → array<label>
```

```
array.from(arg0, arg1, ...) → array<line>
```

```
array.from(arg0, arg1, ...) → array<box>
```

```
array.from(arg0, arg1, ...) → array<table>
```

```
array.from(arg0, arg1, ...) → array<linefill>
```

```
array.from(arg0, arg1, ...) → array<string>
```

```
array.from(arg0, arg1, ...) → array<color>
```

```
array.from(arg0, arg1, ...) → array<int>
```

```
array.from(arg0, arg1, ...) → array<float>
```

```
array.from(arg0, arg1, ...) → array<bool>
```

## Arguments

**arg0, arg1, ... (\<arg...\_type>)** Array arguments.

## Example

```pine
//@version=6
indicator("array.from_example", overlay = false)
arr = array.from("Hello", "World!") // arr (array<string>) will contain 2 elements: {Hello}, {World!}.
plot(close)
```

## Returns

The array element's value.

## Remarks

This function can accept up to 4,000 'int', 'float', 'bool', or 'color' arguments. For all other types, including user-defined types, the limit is 999.
