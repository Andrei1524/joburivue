<template>
  <div class="tag-search">
    <b-field label="Taguri" grouped group-multiline>
      <b-field class="is-flex tags w-100 mb-2">
        <!-- TODO: move tags to own component -->
        <div v-for="(tag, i) in value" :key="tag && tag._id" class="control">
          <b-tag
            v-if="tag"
            :class="{ 'ml-2': i > 0 }"
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
          :clear-on-select="true"
          selectable-header
          :open-on-focus="true"
          :loading="loadingTagsList"
          @focus="getTags(tagSearch)"
          @input="getTags(tagSearch)"
          @select-header="handleSelectHeaderTag"
          @select="handleSelectTag"
        >
          <template #header>
            <a v-if="tagSearch.length > 0 && tagsData.length === 0"
              ><span> Add new... </span></a
            >
          </template>
          <template #empty>No results found</template>
          <template slot-scope="props">
            <div
              :class="{
                'disabled-autocomplete-tag': tagAlreadyExistsOnList(
                  props.option
                ),
              }"
            >
              {{ props.option.name }}
            </div>
          </template>
        </b-autocomplete>
      </b-field>
    </b-field>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import _ from "lodash";
import * as TagService from "~/services/tag.service";

export default Vue.extend({
  name: "TagSearch",

  components: {},
  props: {
    value: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  data() {
    return {
      tagSearch: "",
      tagsData: [],
      loadingTagsList: false,
    };
  },

  methods: {
    removeTag(tagId) {
      const tagIndex = this.value.findIndex((tag) => tag._id === tagId);
      const clonedValues = _.cloneDeep(this.value);
      clonedValues.splice(tagIndex, 1);
      this.$emit("input", [...clonedValues]);
    },

    handleSelectTag(tag) {
      if (this.tagAlreadyExistsOnList(tag)) {
        return;
      }

      this.$emit("input", [...this.value, tag]);
      this.tagSearch = "";
    },

    getTags: _.debounce(async function (search) {
      this.loadingTagsList = true;
      const payload = `?search=${search}`;
      this.tagsData = await TagService.getAll(this.$axios, payload);
      this.loadingTagsList = false;
    }, 250),

    async handleSelectHeaderTag() {
      if (this.tagSearch) {
        try {
          const newTag = await TagService.create(this.$axios, {
            name: this.tagSearch,
          });
          this.$emit("input", [...this.value, newTag]);
          this.tagSearch = "";
        } catch (error) {}
      }
    },

    tagAlreadyExistsOnList(tag) {
      const foundTagInValues = this.value.findIndex(
        (val) => val._id === tag._id
      );

      return foundTagInValues >= 0;
    },

    clearInput() {
      console.log("clear input");
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";

.disabled-autocomplete-tag {
  border-left: 4px solid $orange;
  cursor: not-allowed;
  padding-left: 5px;
}
</style>
