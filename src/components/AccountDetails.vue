<template>
  <div>
    <div>
      <b-avatar :src="avatar"></b-avatar>
      <b-dropdown :text="username" variant="outline-secondary" class="m-md-2">
        <b-dropdown-item v-on:click="showEditModal"
          >Edit account</b-dropdown-item
        >
        <b-dropdown-item v-on:click="logout">Log out</b-dropdown-item>
      </b-dropdown>
    </div>
    <b-modal id="edit-acc-modal" title="Change account details" hide-footer>
      <b-avatar :src="newAvatar"></b-avatar>
      <br />
      Avatar:
      <b-form-file
        v-model="newAvatarFile"
        :state="Boolean(newAvatarFile)"
        @input="convertToBase64"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      ></b-form-file>
      Username:
      <b-form-input v-model="newUsername"></b-form-input>
      <br />
      <b-button variant="danger" v-on:click="submitDetails">Save</b-button>
      <b-spinner v-if="loading" variant="danger" label="Spinning"></b-spinner>
    </b-modal>
  </div>
</template>

<script>
import rest from "../axios/rest";

export default {
  name: "AccountDetails",
  created() {
    this.username = this.$cookies.get("USERNAME");
    const userID = this.$cookies.get("USER_ID");
    rest.post("/acc/avatar", { user_id: userID }).then((res) => {
      this.avatar = res.data.image;
    });
  },
  data() {
    return {
      newAvatarFile: null,
      newAvatar: "",
      newUsername: "",
      avatar: null,
      username: "",
      loading: false
    };
  },
  methods: {
    convertToBase64() {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.newAvatar = reader.result;
      };
      reader.readAsDataURL(this.newAvatarFile);
    },
    submitDetails() {
      if(this.newAvatar != null && this.newUsername != null) {
        this.loading = true;
        rest.restrictedRequest(
        this,
        "PUT",
        "/acc/avatar",
        { image: this.newAvatar },
        (res) => {
          if(res === null) {
            this.$router.push("/");
          }
          this.avatar = this.newAvatar;
          this.username = this.newUsername;
          this.loading = false;
          this.$bvModal.hide('edit-acc-modal');
        }
      );
      }
      
    },
    logout() {
      const refreshToken = this.$cookies.get("REFRESH_TOKEN");
      if (refreshToken !== null) {
        rest.axiosInstanceAuth.post("/logout", { token: refreshToken });
        this.$cookies.remove("REFRESH_TOKEN");
      }
      this.$cookies.remove("ACCESS_TOKEN");
      this.$cookies.remove("USER_ID");
      this.$cookies.remove("USERNAME");

      this.$router.push("/");
    },
    showEditModal() {
      this.loading = false;
      this.$bvModal.show("edit-acc-modal");
      this.newUsername = this.username;
      this.newAvatar = this.avatar;
    },
  },
};
</script>