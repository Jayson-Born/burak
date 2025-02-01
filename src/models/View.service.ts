import Errors, { HttpCode, Message } from "../libs/Errors";
import { View, ViewInput } from "../libs/types/view";
import ViewModel from "../schema/View.model";

class ViewService {
    private readonly viewModel;

    constructor() {
        this.viewModel = ViewModel;
    }

    public async checkviewExistance( input: ViewInput): Promise<View> {
        const view = await this.viewModel
        .findOne ({ memberId: input.memberId, viewRefId: input.viewRefId})
        .exec();
        return view as unknown as View;
    }

    public async insertMemberView(input: ViewInput): Promise<View> {
        try{
            const view = await this.viewModel.create(input);
            return view as unknown as View;
        } catch(err) {
            console.log("ERROR, model:insertMemberView:", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
            
        }
    }

}

export default ViewService;