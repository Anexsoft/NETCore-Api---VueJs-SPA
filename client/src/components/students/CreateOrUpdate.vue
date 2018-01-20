<template>
<div>
    <h2>{{ pageTitle }}</h2>
    <el-form v-loading="loading" :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="Nombre" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Apellido" prop="lastName">
        <el-input v-model="form.lastName"></el-input>
      </el-form-item>
      <el-form-item label="Acerca de mí" prop="bio">
        <el-input type="textarea" v-model="form.bio"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="save" type="primary">Guardar</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
  name: "StudentCreateOrUpdate",
  data() {
    return {
      loading: false,
      form: {
        studentId: 0,
        name: null,
        lastName: null,
        bio: null
      },
      rules: {
        name: [
          { required: true, message: "Debe ingresar un nombre" },
          { min: 3, message: "Debe contener como mínimo 3 caracteres" }
        ],
        lastName: [{ required: true, message: "El apellido es requerido" }],
        bio: [{ required: true, message: "Este campo es requerido" }]
      }
    };
  },
  computed: {
    pageTitle() {
      return this.form.studentId === 0 ? "Nuevo estudiante" : `${this.form.lastName}, ${this.form.name}`;
    }
  },
  created() {
    let self = this;
    self.get(self.$route.params.id);
  },
  methods: {
    get(id) {
      if(id == undefined) return;

      let self = this;

      self.loading = true;
      self.$store.state.services.studentService
        .get(id)
        .then(r => {
          self.loading = false;
          self.form.studentId = r.data.studentId;
          self.form.name = r.data.name;
          self.form.lastName = r.data.lastName;
          self.form.bio = r.data.bio;
        })
        .catch(r => {
          self.$message({
            message: "Ocurrió un error inesperado",
            type: "error"
          });
        });
    },
    save() {
      let self = this;
      self.$refs["ruleForm"].validate(valid => {
        if (valid) {
          self.loading = true;

          if(self.form.studentId > 0) {
            self.$store.state.services.studentService
            .update(self.form)
            .then(r => {
              self.loading = false;
              self.$router.push('/students');
            })
            .catch(r => {
              self.$message({
                message: "Ocurrió un error inesperado",
                type: "error"
              });
            });
          } else {
            self.$store.state.services.studentService
              .add(self.form)
              .then(r => {
                self.loading = false;
                self.$router.push('/students');
              })
              .catch(r => {
                self.$message({
                  message: "Ocurrió un error inesperado",
                  type: "error"
                });
              });
          }
        }
      });
    }
  }
};
</script>