<template>
    <b-card
    style="max-width: 10rem; min-width: 5rem; border-radius: 20px"
    class="mb-2"
  >
    <b-button
      variant="danger"
      style="width: 100%; height: 100%"
      @click="showModal"
      >+</b-button
    >
    <b-modal
      size="lg"
      id="new-sheet"
      title="New sheet"
      hide-footer
    >
      <b-card>
            <div class="float-left">
              <div>
                 Name:
                <br />
                <b-form-input v-model="newSheet.name" type="text"></b-form-input>
                <br />
              </div>
              <div>
                Race:
                <br />
                <b-form-input v-model="newSheet.race" type="text"></b-form-input> 
                <br />
              </div>
              <div>
                Class:
                <br />
                <b-form-input v-model="newSheet.class" type="text"></b-form-input>    
                <br />
              </div>
            </div>
            <div class="float-right">
              <div>
                Level:
                <br />
                <b-form-input style="width: 30%" v-model="newSheet.level" type="number"></b-form-input>
                <br />
              </div>
              <div>
                Alignment:
                <br />
                <b-form-select :options="options" v-model="newSheet.alignment" type="text"></b-form-select>
                <br />
              </div>
              <div>
                Background:
                <br />
                <b-form-input v-model="newSheet.background" type="text"></b-form-input>
                <br /> 
              </div>
            </div>
        </b-card>
        <b-card>
          <div style="display: flex;">
            <div>
              Bonus:
              <br />
              <b-form-input style="width: 30%" v-model="newSheet.bonus" type="number"></b-form-input>
            </div>
            <div>
              Exp:
              <br />
              <b-form-input style="width: 50%" v-model="newSheet.experience_points" type="number"></b-form-input>
            </div>
            <div>
              HP:
              <br />
              <b-form-input style="width: 30%" v-model="newSheet.hp" type="number"></b-form-input>
            </div>  
          </div>
          <div style="display: flex;">
            <div>
              AC:
              <br />
              <b-form-input style="width: 30%" v-model="newSheet.armor_class" type="number"></b-form-input>
            </div>
            <div>
              Initiative:
              <br />
              <b-form-input style="width: 30%" v-model="newSheet.initiative" type="number"></b-form-input>
            </div>
            <div>
              Speed:
              <br />
              <b-form-input style="width: 30%" v-model="newSheet.speed" type="number"></b-form-input>
            </div>
          </div>
        </b-card>
        <b-card>
          <div style="display: flex;">
            <div>
              Strength:
              <br />
              <b-form-input style="width: 30%" v-model="newSheet.strength" type="number"></b-form-input>
            </div>
            <div>
              Dexterity:
              <br />
              <b-form-input style="width: 30%" v-model="newSheet.dexterity" type="number"></b-form-input>
            </div>  
            <div>
              Constitution:
              <br />
              <b-form-input style="width: 30%" v-model="newSheet.constitution" type="number"></b-form-input>
            </div>
          </div>
          <div style="display: flex;">
            <div>
              Intelligence:
              <br />
              <b-form-input style="width: 30%" v-model="newSheet.intelligence" type="number"></b-form-input>
            </div>
            <div>
              Wisdom:
              <br />
              <b-form-input style="width: 30%" v-model="newSheet.wisdom" type="number"></b-form-input>
            </div>
            <div>
              Charisma:
              <br />
              <b-form-input style="width: 30%" v-model="newSheet.charisma" type="number"></b-form-input>
            </div>
          </div>
        </b-card>
        <br />
        <b-button class="float-right" variant="danger" style="width: 25%" @click="submitChanges">Create</b-button>
    </b-modal>
  </b-card>

</template>

<script>
import rest from "../axios/rest"

export default {
    name: "NewSheetCard",
    data(){
        return {
            newSheet: {
                user_id: this.$cookies.get("USER_ID"),
                name: "",
                race: "",
                class: "",
                level: 0,
                exp: 0,
                initiative: 0,
                speed: 0,
                hp: 0,
                alignment: "True Neutral",
                background: "",
                bonus: 0,
                experience_points: 0,
                armor_class: 0,
                strength: 0,
                dexterity: 0,
                constitution: 0,
                intelligence: 0,
                wisdom: 0,
                charisma: 0
            },
            options: ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil']
        }
    },
    methods: {
        showModal() {
            this.$bvModal.show('new-sheet');
        },
        submitChanges() {
            rest.restrictedRequest(this, 'POST', '/sheets/edit', this.newSheet, () => {
                this.$emit('sheet-event', this.newSheet, 'created');
                this.$bvModal.hide('new-sheet');
            })
        }
    }
}
</script>