import rewire from "rewire"
const app = rewire("./app")
const App = app.__get__("App")
// @ponicode
describe("mongoSetup", () => {
    let inst: any

    beforeEach(() => {
        inst = new App()
    })

    test("0", async () => {
        await inst.mongoSetup()
    })
})
