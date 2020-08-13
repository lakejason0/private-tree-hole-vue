<template>
  <div class="text-center">
    <v-bottom-sheet persistent v-model="showCreate" inset scrollable>
      <template v-slot:activator="{}">
        <fab @click="$emit('toggle-create')" />
      </template>
          <v-form ref="createForm" :disabled="sending">
            <v-card tile>
                <v-card-title>
                    {{$t('createThreadForm.title')}}
                </v-card-title>
                <v-card-text>
                        <v-row>
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field
                            :counter="max"
                            :label="$t('createThreadForm.username')"
                            :rules="rules"
                            name="username"
                            prepend-icon="mdi-account"
                            type="text"
                            v-model="username"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field
                            :label="$t('createThreadForm.title')"
                            name="title"
                            prepend-icon="mdi-sign-text"
                            type="text"
                            v-model="title"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <v-textarea
                            v-model="content"
                            prepend-icon="mdi-forum"
                            :label="$t('createThreadForm.content')"
                            auto-grow
                            rows="4"
                            ></v-textarea>
                        </v-col>
                        </v-row>
                        
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn
                        class="mt-6"
                        text
                        color="accent"
                        @click="create"
                        :loading="sending"
                        :disabled="sending"
                    >
                        {{$t('createThreadForm.createButton')}}
                    </v-btn>
                    <v-btn
                        class="mt-6"
                        text
                        color="accent"
                        @click="$emit('toggle-create')"
                        :disabled="sending"
                    >
                        {{$t('createThreadForm.closeButton')}}
                    </v-btn>
                </v-card-actions>
            </v-card>
          </v-form>
    </v-bottom-sheet>
  </div>
</template>

<script>
import fab from "@/components/fab.vue";

export default {
  components: {
    createBar
  },
  props: {
    sending: Boolean,
    showCreate: Boolean
  },
  data: () => ({
    max: 25,
    username: "",
    content: "",
    title: ""
  }),
  computed: {
    rules() {
      const rules = [];
      if (this.max) {
        let rule = v =>
          (v || "").length <= this.max ||
          this.$t("createThreadForm.validateMaxError", { max: this.max });
        rules.push(rule);
      }
      rules.push(
        v => (v||"").length !== 0 || this.$t("createThreadForm.validateNullError")
      ); // @TODO i18n
      return rules;
    }
  },
  methods: {
      create() {
        let createData = {username: this.username, content: this.content, title: this.title};
        this.$emit('create', createData);
      },
      reset() {
        this.$refs.createForm.reset();
      }
  }
};
</script>