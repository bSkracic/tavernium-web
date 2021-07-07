<template>
  <div>
    <div>
      <b-dropdown
        :text="username"
        variant="outline-secondary"
        class="m-md-2"
        style="background: white"
      >
        <b-dropdown-item v-on:click="showEditAcc">Edit account</b-dropdown-item>
        <b-dropdown-item v-on:click="logout">Log out</b-dropdown-item>
      </b-dropdown>
      <b-avatar :src="avatar"></b-avatar>
    </div>
    <b-modal id="edit-acc-modal" :title="'Change account details'" hide-footer>
      <b-avatar :src="newAvatar"></b-avatar>
      <br />
      Avatar:
      <br />
      <div style="display: flex">
        <b-form-file
          style="width: 90%"
          v-model="newAvatarFile"
          :state="Boolean(newAvatarFile)"
          @input="convertToBase64"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <b-button
          style="width: 10%"
          variant="outline-danger"
          @click="
            () => {
              newAvatar = null;
              newAvatarFile = null;
            }
          "
          ><b-icon icon="trash-fill"></b-icon
        ></b-button>
      </div>
      <br />
      Username:
      <b-form-input v-model="newUsername"></b-form-input>
      <br />
      <b-button variant="danger" v-on:click="submitDetails" class="float-right"
        >Save</b-button
      >
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
    rest.restrictedRequest(this, "GET", "/acc/avatar", null, (res) => {
      if (res !== null) {
        this.avatar = res.data.image;
      }
    });
  },
  data() {
    return {
      newAvatarFile: null,
      newAvatar: "",
      newUsername: "",
      avatar: null,
      username: "",
      loading: false,
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
      if (this.newUsername != null) {
        this.loading = true;
        rest.restrictedRequest(
          this,
          "PUT",
          "/acc/avatar",
          { image: this.newAvatar },
          (res) => {
            if (res === null) {
              this.$router.push("/");
            } else {
              rest.restrictedRequest(this, 'PUT', '/change_username', {
                username: this.newUsername
              }, () => {
                this.avatar = this.newAvatar;
                this.username = this.newUsername;
                this.$cookies.set("USERNAME", this.newUsername);
                this.loading = false;
                this.$bvModal.hide("edit-acc-modal");
              })
            }
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
    showEditAcc() {
      this.loading = false;
      this.$bvModal.show("edit-acc-modal");
      this.newUsername = this.username;
      this.newAvatar = this.avatar;
    },
  },
};
</script>