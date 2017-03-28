import Permission from './permission.model'

export async function createPermission(ctx) {
  const permission = new Permission(ctx.request.body) // Obj 형식으로 들어니 걍 쌩으로 저장하면 되겠네.. 헐킈 ㅎㅎㅎㅎ
  console.log(ctx.request.body)
  try {
    await permission.save();
  } catch (err) {
    ctx.throw(422, err.message)
    console.log(err)
  }
}

export async function getPermissions(ctx){
  const permissions = await Permission.find()
  ctx.body = { permissions }
}
