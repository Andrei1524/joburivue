<template>
  <div class="tag-search">
    <b-field label="Taguri" grouped group-multiline>
      <b-field class="w-100 mb-2">
        <div v-for="tag in tags" class="control">
          <!-- TODO: handle fix NULL tags, get tags from BE -->
          <b-tag
            v-if="tag"
            type="is-primary"
            attached
            aria-close-label="Close tag"
            closable
            @close="removeTag(tag._id)"
          >
            {{ tag.name }}
          </b-tag>
        </div>
      </b-field>

      <b-field expanded>
        <b-autocomplete
          v-model="tagSearch"
          :data="tagsData"
          placeholder="e.g. Vue.js"
          icon="magnify"
          clearable
          selectable-header
          @typing="getTags"
          @select-header="handleSelectHeaderTag"
          @select="handleSelectTag"
        >
          <template #header>
            <a><span> Add new... </span></a>
          </template>
          <template #empty>No results found</template>
          <template slot-scope="props">
            <div>{{ props.option.name }}</div>
          </template>
        </b-autocomplete>
      </b-field>
    </b-field>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as TagService from "~/services/tag.service";

export default Vue.extend({
  name: "TagSearch",

  components: {},
  props: {
    tags: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  data() {
    return {
      tagSearch: "",
      tagsData: [],
    };
  },

  methods: {
    removeTag(tagId) {
      const tagIndex = this.form.tags.findIndex((tag) => tag.id === tagId);
      this.form.tags.splice(tagIndex, 1);
    },

    handleSelectTag(tag) {
      this.form.tags.push(tag);
    },

    async getTags(search) {
      const payload = `?search=${search}`;
      const tags = await TagService.getAll(this.$axios, payload);

      this.tagsData = tags;
    },

    handleSelectHeaderTag() {
      if (this.tagSearch) {
        this.form.tags.push({
          id: this.form.tags[this.form.tags.length - 1].id + 1,
          value: this.tagSearch,
        });
        this.tagSearch = null;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";
</style>
