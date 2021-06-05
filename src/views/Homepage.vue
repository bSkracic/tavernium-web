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
                <CampaignCard v-on:campaign-event="onCampaignEvent" :campaign="campaign" :isDM="true" />
              </div>
              <p v-if="!userCampaigns.length" style="text-align: center">
                Wow, such empty.
              </p>
              <NewCampaignCard  v-on:campaign-event="onCampaignEvent" ></NewCampaignCard>
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
                <SheetCard v-on:sheet-event="onSheetEvent" :sheet="sheet" style="padding: 5px" />
                <p v-if="!sheets.length" style="text-align: center">
                Wow, such empty.
              </p>
              </div>
              <NewSheetCard v-on:sheet-event="onSheetEvent" ></NewSheetCard>
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
import NewCampaignCard from "../components/NewCampaignCard.vue"
import NewSheetCard from "../components/NewSheetCard.vue"
import SheetCard from "../components/SheetCard"
import AccountDetails from "../components/AccountDetails.vue";
import rest from "../axios/rest";

export default {
  components: {
    CampaignCard,
    AccountDetails,
    SheetCard,
    CampaignMini,
    NewCampaignCard,
    NewSheetCard
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
  created() {
    // Check if JWT is valid
    rest.restrictedRequest(this, "GET", "/check_valid", null, (res) => {
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
          })
          .catch((e) => console.log(e));
      }
    },
    retrieveSheets() {
      rest.restrictedRequest(this, "GET", "/sheets/user", null, (res) => {
        if(res !== null) {
          this.sheets = res.data;
        }
      })
    },
    onCampaignEvent(campaign, eventType) {
      if(eventType === 'deleted'){
        const index = this.userCampaigns.indexOf(campaign);
        if(index != -1) {
          this.userCampaigns.splice(index, 1);
        }
      } else if(eventType === 'created'){
        this.userCampaigns.push(campaign) 
      }  
    },
    onSheetEvent(sheet, eventType) {
      if(eventType === 'deleted'){
        const index = this.sheets.indexOf(sheet);
        if(index != -1) {
          this.sheets.splice(index, 1);
        }
      } else if(eventType === 'created'){
        this.sheets.push(sheet) 
      }  
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
