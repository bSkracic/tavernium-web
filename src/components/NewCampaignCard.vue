<template>
  <b-card
    style="max-width: 10rem; min-width: 5rem; border-radius: 20px"
    class="mb-2"
  >
    <b-button
      variant="danger"
      style="width: 100%; height: 100%"
      @click="showModal()"
      >+</b-button
    >
    <b-modal
      id="new-campaign"
      title="New campaign"
      hide-footer
    >
      <form>
        <b-form-group label="Title" invalid-feedback="Title is required">
          <b-form-input v-model="newCampaign.title" required></b-form-input>
        </b-form-group>
        <b-form-group label="Thematics">
          <b-form-input v-model="newCampaign.thematics"></b-form-input>
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
import rest from '../axios/rest'

export default {
    name: "NewCampaignCard",
    data() {
        return {
            newCampaign: {
                title: "title",
                thematics: "thematics"
            }
        }
    },
    methods: {
        showModal() {
            this.$bvModal.show('new-campaign');
        },
        submitChanges() {
            rest.restrictedRequest(this, 'POST', '/campaign/edit', this.newCampaign, () => {
                this.newCampaign.owner = this.$cookies.get("USERNAME");
                this.$emit('campaign-event', this.newCampaign, 'created');
                this.$bvModal.hide('new-campaign');
            })
        }
    }
};
</script>