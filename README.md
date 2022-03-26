# 自然约定- 盈平台
### 开发的习惯

先做整体的框架,不要先做细节
根据你自己的能力尽可能做到最好,避免以后回头来修改.
当你积累了太多的问题以后,你除了推到重来,没法的修改的.
==>不停的重构自己的代码.
```
### sass 规范
- [ BEM 命名规范 ](http://git.huanshenghui.com/hsh/styleguide/blob/master/%5B%E8%A7%84%E8%8C%83%5DCSS%20BEM%20%E5%91%BD%E5%90%8D%E8%A7%84%E8%8C%83.md)
- 使用 2 个空格作为缩进。
- 类名建议使用短横代替驼峰法（不允许出现大写字母，参考上面 BEM）
- 不要使用 ID 选择器。
- 在一个规则声明中应用了多个选择器时，每个选择器独占一行。
- 在规则声明的左大括号 { 前加上一个空格。
- 在属性的冒号 : 后面加上一个空格，前面不加空格。
- 规则声明的右大括号 } 独占一行。
- 规则声明之间用空行分隔开。
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
```
- 在 `@extends` 和 `@includes` 之后添加常规样式，以便可以根据需要正确覆盖这些属性。

```scss
.weather {
  @extend %module;
  @include transition(all 0.3s ease-out);
  background: red;
  ...
}
```
- 之后写嵌套的伪类和伪元素

```scss
.weather {
  @extend %module;
  @include transition(all 0.3s ease-out);
  background: LightCyan;
  &:hover {
    background: DarkCyan;
  }
  &::before {
    content: "";
    display: block;
  }
  ...
}
```
- 嵌套选择器在最后

```scss
.weather {
  @extend %module;
  @include transition(all 0.3s ease);
  background: LightCyan;
  &:hover {
    background: DarkCyan;
  }
  &::before {
    content: "";
    display: block;
  }
  > h3 {
    @include transform(rotate(90deg));
    border-bottom: 1px solid white;
  }
  &__temperature {
      ...
  }
}
```

- 选择器层级最多嵌套三层

```scss
.weather {
  .cities {
    li {
      // no more!
    }
  }
}
```

- 如果数字有含义，则定义变量
```scss
$zHeader: 2000;
$zOverlay: 5000;
$zMessage: 5050;

.header {
  z-index: $zHeader;
}
.overlay {
  z-index: $zOverlay;
}
.message {
  z-index: $zMessage;
}
```
```scss
.accordion {
  $accordion-header-color: $primary-color;
  $accordion-padding: 1em;

  @extend %module;
  @include transition(all 0.3s ease-out);
  background: $accordion-header-color;
  padding: $accordion-padding;
}
```



### ts 规范
- [规范TypeScipt 规范.md ](http://git.huanshenghui.com/hsh/styleguide/blob/master/%5B%E8%A7%84%E8%8C%83%5DTypeScipt%20%E8%A7%84%E8%8C%83.md)

### git commit 规范
- [git commit 规范](http://git.huanshenghui.com/hsh/styleguide/blob/master/%5B%E8%A7%84%E8%8C%83%5Dgit%20commit%20%E8%A7%84%E8%8C%83.md)
