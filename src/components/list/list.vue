<template>
  <ul>
    <li v-for="(item, index) in list" :key="`item_${index}`">
      <span v-if="!render">{{item.name}}</span>
      <render-dom v-else :render-func="renderFunc2" :name="item.name"></render-dom>
    </li>
  </ul>
</template>

<script>
import RenderDom from "@/components/render-dom.js";
import { isIP } from "net";
export default {
  components: {
    RenderDom
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    render: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    renderFunc(h, name) {
      return h(
        "i",
        {
          style: {
            color: "pink"
          }
        },
        name
      );
    },
    renderFunc2(h, name) {
      return <i on-click={this.handleClick} style={{ color: 'pink' }}>{name}</i>;
    },
    handleClick(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="less">
ul {
  // list-style: none;
  text-align: left;
}
</style>
