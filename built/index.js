"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = require("@actions/core");
var github = require("@actions/github");
var gretchen_1 = require("gretchen");
function deliver(url, secret, payload) {
    return __awaiter(this, void 0, void 0, function () {
        var workflow, repo, ref, sha, additionalPayload, requestBody, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    workflow = github.context.workflow;
                    repo = github.context.repo;
                    ref = github.context.ref;
                    sha = github.context.sha;
                    additionalPayload = JSON.parse(payload);
                    requestBody = __assign({ 'workflow': workflow, 'repo': repo, 'ref': ref, 'sha': sha }, additionalPayload);
                    console.log("Delivering " + requestBody + " to " + url);
                    core.debug("Delivering " + JSON.stringify(requestBody) + " to " + url);
                    return [4 /*yield*/, gretchen_1.gretch(url, {
                            method: 'POST',
                            headers: {
                                'X-GitHub-Secret': "" + secret
                            },
                            cache: 'no-cache',
                            redirect: 'follow',
                            body: JSON.stringify(requestBody)
                        }).flush()];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var url, secret, payload, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    url = core.getInput('webhook-url');
                    secret = core.getInput('webhook-secret');
                    payload = core.getInput('webhook-payload');
                    return [4 /*yield*/, deliver(url, secret, payload)];
                case 1:
                    result = _a.sent();
                    console.log("Result " + result.status + ": " + result.response.status);
                    core.debug("Result " + result.status + ": " + result.response.statusText);
                    core.setOutput('status', result.status);
                    core.setOutput('statusText', result.response.statusText);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log('Unable to deliver Web Hook', error_1);
                    core.setFailed("Unable to deliver Web Hook " + error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9DQUF1QztBQUN2Qyx3Q0FBMkM7QUFDM0MscUNBQWtDO0FBR2xDLFNBQWUsT0FBTyxDQUFDLEdBQVcsRUFBRSxNQUFjLEVBQUUsT0FBZTs7Ozs7O29CQUMzRCxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7b0JBQ25DLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDM0IsR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO29CQUN6QixHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7b0JBRXpCLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3hDLFdBQVcsY0FDZixVQUFVLEVBQUUsUUFBUSxFQUNwQixNQUFNLEVBQUUsSUFBSSxFQUNaLEtBQUssRUFBRSxHQUFHLEVBQ1YsS0FBSyxFQUFFLEdBQUcsSUFDUCxpQkFBaUIsQ0FDckIsQ0FBQztvQkFFRixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFjLFdBQVcsWUFBTyxHQUFLLENBQUMsQ0FBQztvQkFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBYyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxZQUFPLEdBQUssQ0FBQyxDQUFDO29CQUNqRCxxQkFBTSxpQkFBTSxDQUFDLEdBQUcsRUFBRTs0QkFDakMsTUFBTSxFQUFFLE1BQU07NEJBQ2QsT0FBTyxFQUFFO2dDQUNQLGlCQUFpQixFQUFFLEtBQUcsTUFBUTs2QkFDL0I7NEJBQ0QsS0FBSyxFQUFFLFVBQVU7NEJBQ2pCLFFBQVEsRUFBRSxRQUFROzRCQUNsQixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7eUJBQ2xDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBQTs7b0JBUkosUUFBUSxHQUFHLFNBUVA7b0JBRVYsc0JBQU8sUUFBUSxFQUFDOzs7O0NBQ2pCO0FBRUQsQ0FBQzs7Ozs7OztvQkFFUyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDbkMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDekMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDbEMscUJBQU0sT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUE7O29CQUE1QyxNQUFNLEdBQUcsU0FBbUM7b0JBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBVSxNQUFNLENBQUMsTUFBTSxVQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBUSxDQUFDLENBQUM7b0JBQ2xFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBVSxNQUFNLENBQUMsTUFBTSxVQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBWSxDQUFDLENBQUM7b0JBQ3JFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7OztvQkFFekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxPQUFLLENBQUMsQ0FBQztvQkFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQ0FBOEIsT0FBTyxDQUFDLENBQUM7Ozs7OztDQUV6RCxDQUFDLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb3JlID0gcmVxdWlyZSgnQGFjdGlvbnMvY29yZScpO1xuaW1wb3J0IGdpdGh1YiA9IHJlcXVpcmUoJ0BhY3Rpb25zL2dpdGh1YicpO1xuaW1wb3J0IHsgZ3JldGNoIH0gZnJvbSAnZ3JldGNoZW4nO1xuXG5cbmFzeW5jIGZ1bmN0aW9uIGRlbGl2ZXIodXJsOiBzdHJpbmcsIHNlY3JldDogc3RyaW5nLCBwYXlsb2FkOiBzdHJpbmcpIHtcbiAgY29uc3Qgd29ya2Zsb3cgPSBnaXRodWIuY29udGV4dC53b3JrZmxvdztcbiAgY29uc3QgcmVwbyA9IGdpdGh1Yi5jb250ZXh0LnJlcG87XG4gIGNvbnN0IHJlZiA9IGdpdGh1Yi5jb250ZXh0LnJlZjtcbiAgY29uc3Qgc2hhID0gZ2l0aHViLmNvbnRleHQuc2hhO1xuXG4gIGNvbnN0IGFkZGl0aW9uYWxQYXlsb2FkID0gSlNPTi5wYXJzZShwYXlsb2FkKTtcbiAgY29uc3QgcmVxdWVzdEJvZHkgPSB7XG4gICAgJ3dvcmtmbG93Jzogd29ya2Zsb3csXG4gICAgJ3JlcG8nOiByZXBvLFxuICAgICdyZWYnOiByZWYsXG4gICAgJ3NoYSc6IHNoYSxcbiAgICAuLi5hZGRpdGlvbmFsUGF5bG9hZFxuICB9O1xuXG4gIGNvbnNvbGUubG9nKGBEZWxpdmVyaW5nICR7cmVxdWVzdEJvZHl9IHRvICR7dXJsfWApO1xuICBjb3JlLmRlYnVnKGBEZWxpdmVyaW5nICR7SlNPTi5zdHJpbmdpZnkocmVxdWVzdEJvZHkpfSB0byAke3VybH1gKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBncmV0Y2godXJsLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ1gtR2l0SHViLVNlY3JldCc6IGAke3NlY3JldH1gXG4gICAgfSxcbiAgICBjYWNoZTogJ25vLWNhY2hlJyxcbiAgICByZWRpcmVjdDogJ2ZvbGxvdycsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxdWVzdEJvZHkpXG4gIH0pLmZsdXNoKCk7XG5cbiAgcmV0dXJuIHJlc3BvbnNlO1xufVxuXG4oYXN5bmMgZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHVybCA9IGNvcmUuZ2V0SW5wdXQoJ3dlYmhvb2stdXJsJyk7XG4gICAgY29uc3Qgc2VjcmV0ID0gY29yZS5nZXRJbnB1dCgnd2ViaG9vay1zZWNyZXQnKTtcbiAgICBjb25zdCBwYXlsb2FkID0gY29yZS5nZXRJbnB1dCgnd2ViaG9vay1wYXlsb2FkJyk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGVsaXZlcih1cmwsIHNlY3JldCwgcGF5bG9hZCk7XG4gICAgY29uc29sZS5sb2coYFJlc3VsdCAke3Jlc3VsdC5zdGF0dXN9OiAke3Jlc3VsdC5yZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgY29yZS5kZWJ1ZyhgUmVzdWx0ICR7cmVzdWx0LnN0YXR1c306ICR7cmVzdWx0LnJlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgY29yZS5zZXRPdXRwdXQoJ3N0YXR1cycsIHJlc3VsdC5zdGF0dXMpO1xuICAgIGNvcmUuc2V0T3V0cHV0KCdzdGF0dXNUZXh0JywgcmVzdWx0LnJlc3BvbnNlLnN0YXR1c1RleHQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKCdVbmFibGUgdG8gZGVsaXZlciBXZWIgSG9vaycsIGVycm9yKTtcbiAgICBjb3JlLnNldEZhaWxlZChgVW5hYmxlIHRvIGRlbGl2ZXIgV2ViIEhvb2sgJHtlcnJvcn1gKTtcbiAgfVxufSkoKTtcbiJdfQ==