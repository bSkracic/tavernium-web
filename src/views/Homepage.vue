<template>
  <div>
    <main>
        <b-card no-body style="height: 100%;">
          <b-card-header>
            <div id="nav" class="float-left">
              <img src="../assets/tavernium_icon.png" />
              <h1>Tavernium</h1>
            </div>
            <AccountDetails class="float-right" />
          </b-card-header>
          <b-tabs
            card
            vertical
            align="center"
            active-nav-item-class="font-weight-bold text-danger"
          >
            <b-tab
              title="My Campaigns"
              active
              :title-link-class="'inactive-nav-title'"
            >
              <div
                v-for="campaign in userCampaigns"
                v-bind:key="campaign.id"
                style="float: left"
              >
                <CampaignCard :campaign="campaign" :isDM="true" />
              </div>
              <p v-if="!userCampaigns.length" style="text-align: center">
                Wow, such empty.
              </p>
              <b-card
                style="max-width: 10rem; min-width: 5rem; border-radius: 20px;"
                class="mb-2"
              >
                <b-button
                  variant="danger"
                  style="width: 100%; height: 100%"
                  @click="newCampaign"
                  >+</b-button
                >
              </b-card>
            </b-tab>
            <b-tab
              title="Joined Campaigns"
              :title-link-class="'inactive-nav-title'"
            >
              <div
                v-for="campaign in joinedCampaigns"
                v-bind:key="campaign.id"
                style="float: left"
              >
                <CampaignCard
                  :campaign="campaign"
                  :isDM="false"
                />
              </div>
              <p v-if="!joinedCampaigns.length" style="text-align: center">
                Wow, such empty.
              </p>
            </b-tab>
            <b-tab
              title="Search Campaigns"
              :title-link-class="'inactive-nav-title'"
            >
              <div>
                <b-form-input
                  style="width: 50%;align-self: center;"
                  placeholder="search by name..."
                  @input="searchCampaigns"
                  v-model="searchTerm"
                ></b-form-input>
              </div>
              <div style="color: black">
                <div
                  v-for="campaign in searchedCampaigns"
                  v-bind:key="campaign.id"
                >
                  <CampaignMini :campaign="campaign" />
                </div>
              </div>
            </b-tab>
            <b-tab
              title="Sheets"
              :title-link-class="'inactive-nav-title'"
            >
              <div
                v-for="sheet in sheets"
                v-bind:key="sheet.id"
                style="float: left"
              >
                <SheetCard :sheet="sheet" style="padding: 5px" />
                <p v-if="!sheets.length" style="text-align: center">
                Wow, such empty.
              </p>
              </div>
            </b-tab>
            <b-tab
              title="Download Tavernium for Windows"
              :title-link-class="'inactive-nav-title'"
            >
              <div>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
    </main>
  </div>
</template> 

<script>
import CampaignMini from "../components/CampaignMini.vue";
import CampaignCard from "../components/CampaignCard.vue";
import SheetCard from "../components/SheetCard"
import AccountDetails from "../components/AccountDetails.vue";
import rest from "../axios/rest";

export default {
  components: {
    CampaignCard,
    AccountDetails,
    SheetCard,
    CampaignMini,
  },
  name: "Homepage",
  data() {
    return {
      searchTerm: "",
      searchedCampaigns: [],
      userCampaigns: [],
      joinedCampaigns: [],
      sheets: []
    };
  },
  mounted() {
    // Check if JWT is valid
    rest.restrictedRequest(this, "GET", "/check_valid", null, (res) => {
      console.log(res)
      if (res === null) {
        this.$router.push("/");
      }
    });
    this.retrieveCampaigns();
    this.retrieveSheets();
  },
  methods: {
    retrieveCampaigns() {
      rest
        .post("/campaign/user", { user_id: this.$cookies.get("USER_ID") })
        .then((res) => (this.userCampaigns = res.data))
        .catch((e) => console.log(e));
      rest
        .post("/campaign/joined", { user_id: this.$cookies.get("USER_ID") })
        .then((res) => (this.joinedCampaigns = res.data))
        .catch((e) => console.log(e));
    },
    searchCampaigns() {
      if (this.searchTerm.length > 2) {
        rest
          .post(`/campaign/search?term=${this.searchTerm}`, {
            user_id: this.$cookies.get("USER_ID"),
          })
          .then((res) => {
            this.searchedCampaigns = res.data;
            console.log(res.data);
          })
          .catch((e) => console.log(e));
      }
    },
    newCampaign() {

    },
    retrieveSheets() {
      rest.restrictedRequest(this, "GET", "/sheets/user", null, (res) => {
        if(res !== null) {
          this.sheets = res.data;
          console.log({sheets: this.sheets, data: res.data});
        }
      })
    }
  },
};
</script>

<style>
.inactive-nav-title {
  color: black !important;
}
</style>

<style scoped>
nav > img {
  max-height: 50px;
  max-width: 50px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
#nav {
  padding: 30px;
  display: flex;
  justify-content: center;
  font-family: fantasy;
}

#nav > img {
  max-height: 50px;
  max-width: 50px;
}
</style>
