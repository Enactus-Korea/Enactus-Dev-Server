import Projects from './projects.model'

export async function getProjects(ctx) {
  const projects = await Projects.find()
  ctx.body = { projects }
}


export async function createProject(ctx, next) {
  const projects = new Projects(ctx.request.body) // Obj 형식으로 들어니 걍 쌩으로 저장하면 되겠네.. 헐킈 ㅎㅎㅎㅎ
  console.log(ctx.request.body)
  try {
    await projects.save();
  } catch (err) {
    ctx.throw(422, err.message)
    console.log(err)
  }
}

export async function isUnivProjects(ctx, next) {
  console.log(ctx.params.univ);
  const univProjects = await Projects.find({univ:ctx.params.univ})
  ctx.body = { univProjects }
}

export async function isPortionOfNeeds(ctx, next) {
  console.log(ctx.params.needs);
  const needs = await Projects.find({portionOf:{$in: [ctx.params.needs]}})
  ctx.body = { needs }
}
