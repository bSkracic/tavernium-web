<template>
  <b-card
    :title="sheet.name"
    :sub-title="`Level ${sheet.level} ${sheet.race} ${sheet.class}`"
    tag=campaign
    style="max-width: 20rem"
    class="mb-2"
  >
    <b-card-text>
        <b-list-group flush> 
            <b-list-group-item>Exp: {{sheet.experience_points}}</b-list-group-item>
            <b-list-group-item>Alignment: {{sheet.alignment}}</b-list-group-item>
            <b-list-group-item>Background: {{sheet.background}}</b-list-group-item>
            <hr>
        </b-list-group>
        <div>
          <b-button variant="danger" class="float-left" style="width: 25%" @click="showDeleteModal"><b-icon icon="trash-fill" ></b-icon></b-button>
          <b-button variant="danger" class="float-right" style="width: 25%" @click="showEditModal"><b-icon icon="pencil-fill" ></b-icon></b-button>
        </div>
    </b-card-text>
    <b-modal
      :id="'delete-sheet-' + sheet.id"
      :title="'Delete ' + sheet.name + '?'"
      hide-footer
    >
    <p>
      Are you sure wnat to delete this character sheet?
    </p>
      <b-button
          class="mt-2"
          variant="danger"
          block
          @click="deleteSheet()"
          >Delete</b-button
        >
    </b-modal>
    <b-modal
    title="Edit characters sheet:"
    size="lg"
    :id="'edit-sheet-' + sheet.id"
    hide-footer
    >
        <b-card>
            <div class="float-left">
              <div>
                 Name:
                <br />
                <b-form-input v-model="sheetCopy.name" type="text"></b-form-input>
                <br />
              </div>
              <div>
                Race:
                <br />
                <b-form-input v-model="sheetCopy.race" type="text"></b-form-input> 
                <br />
              </div>
              <div>
                Class:
                <br />
                <b-form-input v-model="sheetCopy.class" type="text"></b-form-input>    
                <br />
              </div>
            </div>
            <div class="float-right">
              <div>
                Level:
                <br />
                <b-form-input style="width: 30%" v-model="sheetCopy.level" type="number"></b-form-input>
                <br />
              </div>
              <div>
                Alignment:
                <br />
                <b-form-select :options="options" v-model="sheetCopy.alignment" type="text"></b-form-select>
                <br />
              </div>
              <div>
                Background:
                <br />
                <b-form-input v-model="sheetCopy.background" type="text"></b-form-input>
                <br /> 
              </div>
            </div>
        </b-card>
        <b-card>
          <div style="display: flex;">
            <div>
              Bonus:
              <br />
              <b-form-input style="width: 30%" v-model="sheetCopy.bonus" type="number"></b-form-input>
            </div>
            <div>
              Exp:
              <br />
              <b-form-input style="width: 50%" v-model="sheetCopy.experience_points" type="number"></b-form-input>
            </div>
            <div>
              HP:
              <br />
              <b-form-input style="width: 30%" v-model="sheetCopy.hp" type="number"></b-form-input>
            </div>  
          </div>
          <div style="display: flex;">
            <div>
              AC:
              <br />
              <b-form-input style="width: 30%" v-model="sheetCopy.armor_class" type="number"></b-form-input>
            </div>
            <div>
              Initiative:
              <br />
              <b-form-input style="width: 30%" v-model="sheetCopy.initiative" type="number"></b-form-input>
            </div>
            <div>
              Speed:
              <br />
              <b-form-input style="width: 30%" v-model="sheetCopy.speed" type="number"></b-form-input>
            </div>
          </div>
        </b-card>
        <b-card>
          <div style="display: flex;">
            <div>
              Strength:
              <br />
              <b-form-input style="width: 30%" v-model="sheetCopy.strength" type="number"></b-form-input>
            </div>
            <div>
              Dexterity:
              <br />
              <b-form-input style="width: 30%" v-model="sheetCopy.dexterity" type="number"></b-form-input>
            </div>  
            <div>
              Constitution:
              <br />
              <b-form-input style="width: 30%" v-model="sheetCopy.constitution" type="number"></b-form-input>
            </div>
          </div>
          <div style="display: flex;">
            <div>
              Intelligence:
              <br />
              <b-form-input style="width: 30%" v-model="sheetCopy.intelligence" type="number"></b-form-input>
            </div>
            <div>
              Wisdom:
              <br />
              <b-form-input style="width: 30%" v-model="sheetCopy.wisdom" type="number"></b-form-input>
            </div>
            <div>
              Charisma:
              <br />
              <b-form-input style="width: 30%" v-model="sheetCopy.charisma" type="number"></b-form-input>
            </div>
          </div>
        </b-card>
        <br />
        <b-button class="float-right" variant="danger" style="width: 25%" @click="editSheet">Save</b-button>
    </b-modal>
  </b-card>
</template>

<script>
//     user_id,
//     class,
//     level, -
//     background, -
//     name, -
//     race, -
//     alignment,
//     experience_points, -
//     strength,
//     dexterity,
//     constitution,
//     intelligence,
//     wisdom,
//     charisma,
//     bonus, -
//     armor_class, -
//     initiative,
//     speed -
//     hp
import rest from '../axios/rest'
export default {
  name: "SheetCard",
  props: {
    sheet: Object,
  },
  data(){
    return {
      options: ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'],
      sheetCopy: null
    }
  },
  created() {
    this.sheetCopy = {...this.sheet};
  },
  methods:{
    showDeleteModal() {
      this.$bvModal.show(`delete-sheet-${this.sheet.id}`);
    },
    showEditModal() {
      this.$bvModal.show(`edit-sheet-${this.sheet.id}`);
      this.sheetCopy = {...this.sheet};
    },
    deleteSheet() {
      rest.restrictedRequest(this, 'DELETE', '/sheets/user', {id: this.sheet.id}, () => {
        this.$bvModal.hide(`delete-sheet-${this.sheet.id}`);
        this.$emit('sheet-event', this.sheet, 'deleted');
      })
    },
    editSheet() {
      rest.restrictedRequest(this, 'PUT', '/sheets/edit', this.sheetCopy, () => {
        this.$bvModal.hide(`edit-sheet-${this.sheet.id}`);
      })
    }
  } 
};
</script>
