<template>
  <b-card
    :title="campaign.title"
    :sub-title="campaign.owner"
    :img-src="campaign.image"
    img-alt="Campaign Image"
    img-top
    style="max-width: 30rem; min-width: 20rem"
    class="mb-2"
  >
    <b-card-text>
      {{ campaign.thematics }}
    </b-card-text>
    <b-button v-if="isDM" variant="danger" class="float-left" style="width: 25%"><b-icon icon="trash-fill" ></b-icon></b-button>
    <b-button v-if="isDM" variant="danger" class="float-right" style="width: 25%" @click="showModal"><b-icon icon="pencil-fill" ></b-icon></b-button>
    <b-modal
      :id="'edit-modal-' + campaign.id"
      :title="'Edit ' + campaign.title"
      hide-footer
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Title" invalid-feedback="Title is required">
          <b-form-input v-model="campaignCopy.title" required></b-form-input>
        </b-form-group>
        <b-form-group label="Thematics">
          <b-form-input v-model="campaignCopy.thematics"></b-form-input>
        </b-form-group>
        <b-button
          class="mt-2"
          variant="outline-danger"
          block
          @click="submitChanges"
          >Save</b-button
        >
      </form>
    </b-modal>
  </b-card>
</template>

<script>
import rest from "../axios/rest";

export default {
  name: "CampaignCard",
  props: {
    isDM: Boolean,
    campaign: Object,
  },
  data() {
    return {
      campaignCopy: null
    }
  },
  created() {
    this.campaignCopy = {
        title: this.campaign.title,
        thematics: this.campaign.thematics,
        id: this.campaign.id,
        owner: this.campaign.owner
      };
  },
  methods: {
    showModal() {
      this.$bvModal.show(`edit-modal-${this.campaign.id}`);
      this.campaignCopy = {
        title: this.campaign.title,
        thematics: this.campaign.thematics,
        id: this.campaign.id,
        owner: this.campaign.owner
      };
    },
    submitChanges() {
      const context = this;
      rest.restrictedRequest(
        context,
        "PUT",
        "/campaign/edit",
        this.campaignCopy,
        () => {
          context.$bvModal.hide(`edit-modal-${this.campaign.id}`);
          this.campaign = this.campaignCopy;
        }
      );
    },
  },
};
</script>

<style scoped>
</style>