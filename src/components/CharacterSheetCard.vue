<template>
    <b-card
      :title="sheet.name"
      :img-src="sheet.image === null ? DEFAULT_IMAGE : sheet.image"
      img-alt="Campaign Image"
      img-height="250rem"
      img-top
      tag="article"
      style="max-width: 20rem; min-width: 20rem"
      class="mb-2"
    >
      <b-list-group flush>
        <b-list-group-item>Level: {{sheet.level}}</b-list-group-item>
        <b-list-group-item>Class: {{sheet.class}}</b-list-group-item>
        <b-list-group-item>Race: {{sheet.race}}</b-list-group-item>
      </b-list-group>
      <b-button variant="danger" v-on:click="joinCampaign">Edit</b-button>
    </b-card>
</template>

<script>
export default {
  name: "CharacterSheetCard",
  props: {
      sheet: Object
  },
  data() {
      return {
          DEFAULT_IMAGE: "https://cdn3.iconfinder.com/data/icons/private-investigator-malibu-vol-2/128/Missing_Person-512.png"
      }
  }
};
</script>

<style scoped>
</style>
