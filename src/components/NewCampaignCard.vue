<template>
  <div
    style="width: 20rem;" 
  >
    <b-button
      style="background-color: #4B4A67; width: 50%; height: 100%"
      @click="showModal()"
      >New campaign</b-button
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
          style="background-color: #4b4a67;"
          block
          @click="submitChanges"
          >Save</b-button
        >
      </form>
    </b-modal>
  </div>

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