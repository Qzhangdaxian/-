module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  // 按需引入Ant Design of Vue组件样式
  plugins: [
    [
      "import",
      {
        libraryName: "ant-design-vue",
        libraryDirectory: "es",
        style: 'css'
      }
    ]
  ]
}
