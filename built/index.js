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
                    return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            headers: {
                                'X-GitHub-Secret': "" + secret
                            },
                            cache: 'no-cache',
                            redirect: 'follow',
                            body: JSON.stringify(requestBody)
                        })];
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
                    console.log("Result " + result.status + ": " + result.statusText);
                    core.setOutput('status', result.status);
                    core.setOutput('statusText', result.statusText);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log('Unable to deliver Web Hook', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9DQUF1QztBQUN2Qyx3Q0FBMkM7QUFFM0MsU0FBZSxPQUFPLENBQUMsR0FBVyxFQUFFLE1BQWMsRUFBRSxPQUFlOzs7Ozs7b0JBQzNELFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztvQkFDbkMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUMzQixHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7b0JBQ3pCLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztvQkFFekIsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDeEMsV0FBVyxjQUNmLFVBQVUsRUFBRSxRQUFRLEVBQ3BCLE1BQU0sRUFBRSxJQUFJLEVBQ1osS0FBSyxFQUFFLEdBQUcsRUFDVixLQUFLLEVBQUUsR0FBRyxJQUNQLGlCQUFpQixDQUNyQixDQUFDO29CQUVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWMsV0FBVyxZQUFPLEdBQUssQ0FBQyxDQUFDO29CQUNsQyxxQkFBTSxLQUFLLENBQUMsR0FBRyxFQUFFOzRCQUNoQyxNQUFNLEVBQUUsTUFBTTs0QkFDZCxPQUFPLEVBQUU7Z0NBQ1AsaUJBQWlCLEVBQUUsS0FBRyxNQUFROzZCQUMvQjs0QkFDRCxLQUFLLEVBQUUsVUFBVTs0QkFDakIsUUFBUSxFQUFFLFFBQVE7NEJBQ2xCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQzt5QkFDbEMsQ0FBQyxFQUFBOztvQkFSSSxRQUFRLEdBQUcsU0FRZjtvQkFFRixzQkFBTyxRQUFRLEVBQUM7Ozs7Q0FDakI7QUFFRCxDQUFDOzs7Ozs7O29CQUVTLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNuQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUN6QyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUNsQyxxQkFBTSxPQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBQTs7b0JBQTVDLE1BQU0sR0FBRyxTQUFtQztvQkFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFVLE1BQU0sQ0FBQyxNQUFNLFVBQUssTUFBTSxDQUFDLFVBQVksQ0FBQyxDQUFDO29CQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7OztvQkFFaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxPQUFLLENBQUMsQ0FBQzs7Ozs7O0NBRXBELENBQUMsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvcmUgPSByZXF1aXJlKCdAYWN0aW9ucy9jb3JlJyk7XG5pbXBvcnQgZ2l0aHViID0gcmVxdWlyZSgnQGFjdGlvbnMvZ2l0aHViJyk7XG5cbmFzeW5jIGZ1bmN0aW9uIGRlbGl2ZXIodXJsOiBzdHJpbmcsIHNlY3JldDogc3RyaW5nLCBwYXlsb2FkOiBzdHJpbmcpOiBQcm9taXNlPFJlc3BvbnNlPiB7XG4gIGNvbnN0IHdvcmtmbG93ID0gZ2l0aHViLmNvbnRleHQud29ya2Zsb3c7XG4gIGNvbnN0IHJlcG8gPSBnaXRodWIuY29udGV4dC5yZXBvO1xuICBjb25zdCByZWYgPSBnaXRodWIuY29udGV4dC5yZWY7XG4gIGNvbnN0IHNoYSA9IGdpdGh1Yi5jb250ZXh0LnNoYTtcblxuICBjb25zdCBhZGRpdGlvbmFsUGF5bG9hZCA9IEpTT04ucGFyc2UocGF5bG9hZCk7XG4gIGNvbnN0IHJlcXVlc3RCb2R5ID0ge1xuICAgICd3b3JrZmxvdyc6IHdvcmtmbG93LFxuICAgICdyZXBvJzogcmVwbyxcbiAgICAncmVmJzogcmVmLFxuICAgICdzaGEnOiBzaGEsXG4gICAgLi4uYWRkaXRpb25hbFBheWxvYWRcbiAgfTtcblxuICBjb25zb2xlLmxvZyhgRGVsaXZlcmluZyAke3JlcXVlc3RCb2R5fSB0byAke3VybH1gKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnWC1HaXRIdWItU2VjcmV0JzogYCR7c2VjcmV0fWBcbiAgICB9LFxuICAgIGNhY2hlOiAnbm8tY2FjaGUnLFxuICAgIHJlZGlyZWN0OiAnZm9sbG93JyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXF1ZXN0Qm9keSlcbiAgfSk7XG5cbiAgcmV0dXJuIHJlc3BvbnNlO1xufVxuXG4oYXN5bmMgZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHVybCA9IGNvcmUuZ2V0SW5wdXQoJ3dlYmhvb2stdXJsJyk7XG4gICAgY29uc3Qgc2VjcmV0ID0gY29yZS5nZXRJbnB1dCgnd2ViaG9vay1zZWNyZXQnKTtcbiAgICBjb25zdCBwYXlsb2FkID0gY29yZS5nZXRJbnB1dCgnd2ViaG9vay1wYXlsb2FkJyk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGVsaXZlcih1cmwsIHNlY3JldCwgcGF5bG9hZCk7XG4gICAgY29uc29sZS5sb2coYFJlc3VsdCAke3Jlc3VsdC5zdGF0dXN9OiAke3Jlc3VsdC5zdGF0dXNUZXh0fWApO1xuICAgIGNvcmUuc2V0T3V0cHV0KCdzdGF0dXMnLCByZXN1bHQuc3RhdHVzKTtcbiAgICBjb3JlLnNldE91dHB1dCgnc3RhdHVzVGV4dCcsIHJlc3VsdC5zdGF0dXNUZXh0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIGRlbGl2ZXIgV2ViIEhvb2snLCBlcnJvcik7XG4gIH1cbn0pKCk7XG4iXX0=