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
var fs = require("fs");
var util = require("util");
var core = require("@actions/core");
var github = require("@actions/github");
var axios_1 = require("axios");
var readFile = util.promisify(fs.readFile);
function deliver(url, secret, payload) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        var workflow, repo, ref, sha, workFlowPaylod, headSha, pullRequestUrl, eventRef, eventMetadata, _g, _h, pullRequestNumber, sender, notifyOnFailure, additionalPayload, requestBody, requestConfig, response;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    workflow = github.context.workflow;
                    repo = github.context.repo;
                    ref = github.context.ref;
                    sha = github.context.sha;
                    workFlowPaylod = github.context.payload;
                    // Log the actual workflow payload for debugging
                    core.info("Workflow payload " + JSON.stringify(workFlowPaylod));
                    headSha = (_c = (_b = (_a = workFlowPaylod === null || workFlowPaylod === void 0 ? void 0 : workFlowPaylod.pull_request) === null || _a === void 0 ? void 0 : _a.head) === null || _b === void 0 ? void 0 : _b.sha) !== null && _c !== void 0 ? _c : sha;
                    pullRequestUrl = (_d = workFlowPaylod === null || workFlowPaylod === void 0 ? void 0 : workFlowPaylod.pull_request) === null || _d === void 0 ? void 0 : _d.html_url;
                    if (!!!pullRequestUrl) return [3 /*break*/, 2];
                    eventRef = process.env.GITHUB_REF;
                    if (!eventRef) return [3 /*break*/, 2];
                    console.info("Reading event reference " + eventRef);
                    _h = (_g = JSON).parse;
                    return [4 /*yield*/, readFile(eventRef, 'utf-8')];
                case 1:
                    eventMetadata = _h.apply(_g, [_j.sent()]);
                    if (eventMetadata) {
                        console.info("Event Metadata " + eventMetadata);
                        pullRequestNumber = (_e = eventMetadata === null || eventMetadata === void 0 ? void 0 : eventMetadata.pull_request) === null || _e === void 0 ? void 0 : _e.number;
                        if (pullRequestNumber) {
                            pullRequestUrl = "https://github.com/androidx/androidx/pull/" + pullRequestNumber;
                        }
                    }
                    _j.label = 2;
                case 2:
                    sender = (_f = workFlowPaylod === null || workFlowPaylod === void 0 ? void 0 : workFlowPaylod.sender) === null || _f === void 0 ? void 0 : _f.login;
                    notifyOnFailure = sender === 'copybara-service[bot]';
                    additionalPayload = JSON.parse(payload);
                    requestBody = __assign({ 'workflow': workflow, 'repo': repo, 'ref': ref, 'sha': headSha, 'notifyOnFailure': notifyOnFailure }, additionalPayload);
                    if (pullRequestUrl) {
                        requestBody['pullRequestUrl'] = pullRequestUrl;
                    }
                    core.info("Delivering " + JSON.stringify(requestBody) + " to " + url);
                    requestConfig = {
                        url: url,
                        method: 'POST',
                        data: requestBody
                    };
                    if (secret) {
                        requestConfig['headers'] = {
                            'X-GitHub-Secret': "" + secret
                        };
                    }
                    response = axios_1.default(requestConfig);
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
                    url = core.getInput('url');
                    secret = core.getInput('secret');
                    payload = core.getInput('payload');
                    core.info("Making a HTTP POST request to " + url);
                    return [4 /*yield*/, deliver(url, secret, payload)];
                case 1:
                    result = _a.sent();
                    core.info("Result " + result.status + ": " + result.statusText);
                    core.setOutput('status', result.status);
                    core.setOutput('statusText', result.statusText);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    core.setFailed("Unable to deliver Web Hook " + error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVCQUEwQjtBQUMxQiwyQkFBOEI7QUFDOUIsb0NBQXVDO0FBQ3ZDLHdDQUEyQztBQUMzQywrQkFBZ0U7QUFFaEUsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFN0MsU0FBZSxPQUFPLENBQUMsR0FBVyxFQUFFLE1BQWMsRUFBRSxPQUFlOzs7Ozs7O29CQUMzRCxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7b0JBQ25DLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDM0IsR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO29CQUN6QixHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7b0JBQ3pCLGNBQWMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztvQkFFOUMsZ0RBQWdEO29CQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFvQixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBRyxDQUFDLENBQUM7b0JBRTFELE9BQU8scUJBQUcsY0FBYyxhQUFkLGNBQWMsdUJBQWQsY0FBYyxDQUFFLFlBQVksMENBQUUsSUFBSSwwQ0FBRSxHQUFHLG1DQUFJLEdBQUcsQ0FBQztvQkFDM0QsY0FBYyxTQUFHLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxZQUFZLDBDQUFFLFFBQVEsQ0FBQzt5QkFDeEQsQ0FBQyxDQUFDLGNBQWMsRUFBaEIsd0JBQWdCO29CQUNaLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQzt5QkFDcEMsUUFBUSxFQUFSLHdCQUFRO29CQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsNkJBQTJCLFFBQVUsQ0FBQyxDQUFDO29CQUM5QixLQUFBLENBQUEsS0FBQSxJQUFJLENBQUEsQ0FBQyxLQUFLLENBQUE7b0JBQUMscUJBQU0sUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBQTs7b0JBQTVELGFBQWEsR0FBRyxjQUFXLFNBQWlDLEVBQUM7b0JBQ25FLElBQUksYUFBYSxFQUFFO3dCQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFrQixhQUFlLENBQUMsQ0FBQzt3QkFHMUMsaUJBQWlCLFNBQUcsYUFBYSxhQUFiLGFBQWEsdUJBQWIsYUFBYSxDQUFFLFlBQVksMENBQUUsTUFBTSxDQUFDO3dCQUM5RCxJQUFJLGlCQUFpQixFQUFFOzRCQUNyQixjQUFjLEdBQUcsK0NBQTZDLGlCQUFtQixDQUFDO3lCQUNuRjtxQkFDRjs7O29CQUlDLE1BQU0sU0FBRyxjQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsTUFBTSwwQ0FBRSxLQUFLLENBQUM7b0JBRXZDLGVBQWUsR0FBRyxNQUFNLEtBQUssdUJBQXVCLENBQUM7b0JBRXJELGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3hDLFdBQVcsY0FDZixVQUFVLEVBQUUsUUFBUSxFQUNwQixNQUFNLEVBQUUsSUFBSSxFQUNaLEtBQUssRUFBRSxHQUFHLEVBQ1YsS0FBSyxFQUFFLE9BQU8sRUFDZCxpQkFBaUIsRUFBRSxlQUFlLElBQy9CLGlCQUFpQixDQUNyQixDQUFDO29CQUVGLElBQUksY0FBYyxFQUFFO3dCQUNsQixXQUFXLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxjQUFjLENBQUM7cUJBQ2hEO29CQUVELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsWUFBTyxHQUFLLENBQUMsQ0FBQztvQkFFM0QsYUFBYSxHQUF1Qjt3QkFDeEMsR0FBRyxFQUFFLEdBQUc7d0JBQ1IsTUFBTSxFQUFFLE1BQU07d0JBQ2QsSUFBSSxFQUFFLFdBQVc7cUJBQ2xCLENBQUM7b0JBQ0YsSUFBSSxNQUFNLEVBQUU7d0JBQ1YsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHOzRCQUN6QixpQkFBaUIsRUFBRSxLQUFHLE1BQVE7eUJBQy9CLENBQUE7cUJBQ0Y7b0JBQ0ssUUFBUSxHQUFHLGVBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDdEMsc0JBQU8sUUFBUSxFQUFDOzs7O0NBQ2pCO0FBRUQsQ0FBQzs7Ozs7OztvQkFFUyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDM0IsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2pDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLG1DQUFpQyxHQUFLLENBQUMsQ0FBQztvQkFDbkMscUJBQU0sT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUE7O29CQUE1QyxNQUFNLEdBQUcsU0FBbUM7b0JBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBVSxNQUFNLENBQUMsTUFBTSxVQUFLLE1BQU0sQ0FBQyxVQUFZLENBQUMsQ0FBQztvQkFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7Ozs7b0JBRWhELElBQUksQ0FBQyxTQUFTLENBQUMsZ0NBQThCLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7Q0FFekQsQ0FBQyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgPSByZXF1aXJlKCdmcycpO1xuaW1wb3J0IHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5pbXBvcnQgY29yZSA9IHJlcXVpcmUoJ0BhY3Rpb25zL2NvcmUnKTtcbmltcG9ydCBnaXRodWIgPSByZXF1aXJlKCdAYWN0aW9ucy9naXRodWInKTtcbmltcG9ydCBheGlvcywgeyBBeGlvc1Byb21pc2UsIEF4aW9zUmVxdWVzdENvbmZpZyB9IGZyb20gJ2F4aW9zJztcblxuY29uc3QgcmVhZEZpbGUgPSB1dGlsLnByb21pc2lmeShmcy5yZWFkRmlsZSk7XG5cbmFzeW5jIGZ1bmN0aW9uIGRlbGl2ZXIodXJsOiBzdHJpbmcsIHNlY3JldDogc3RyaW5nLCBwYXlsb2FkOiBzdHJpbmcpOiBQcm9taXNlPEF4aW9zUHJvbWlzZTx7fT4+IHtcbiAgY29uc3Qgd29ya2Zsb3cgPSBnaXRodWIuY29udGV4dC53b3JrZmxvdztcbiAgY29uc3QgcmVwbyA9IGdpdGh1Yi5jb250ZXh0LnJlcG87XG4gIGNvbnN0IHJlZiA9IGdpdGh1Yi5jb250ZXh0LnJlZjtcbiAgY29uc3Qgc2hhID0gZ2l0aHViLmNvbnRleHQuc2hhO1xuICBjb25zdCB3b3JrRmxvd1BheWxvZCA9IGdpdGh1Yi5jb250ZXh0LnBheWxvYWQ7XG5cbiAgLy8gTG9nIHRoZSBhY3R1YWwgd29ya2Zsb3cgcGF5bG9hZCBmb3IgZGVidWdnaW5nXG4gIGNvcmUuaW5mbyhgV29ya2Zsb3cgcGF5bG9hZCAke0pTT04uc3RyaW5naWZ5KHdvcmtGbG93UGF5bG9kKX1gKTtcblxuICBjb25zdCBoZWFkU2hhID0gd29ya0Zsb3dQYXlsb2Q/LnB1bGxfcmVxdWVzdD8uaGVhZD8uc2hhID8/IHNoYTtcbiAgbGV0IHB1bGxSZXF1ZXN0VXJsID0gd29ya0Zsb3dQYXlsb2Q/LnB1bGxfcmVxdWVzdD8uaHRtbF91cmw7XG4gIGlmICghIXB1bGxSZXF1ZXN0VXJsKSB7XG4gICAgY29uc3QgZXZlbnRSZWYgPSBwcm9jZXNzLmVudi5HSVRIVUJfUkVGO1xuICAgIGlmIChldmVudFJlZikge1xuICAgICAgY29uc29sZS5pbmZvKGBSZWFkaW5nIGV2ZW50IHJlZmVyZW5jZSAke2V2ZW50UmVmfWApO1xuICAgICAgY29uc3QgZXZlbnRNZXRhZGF0YSA9IEpTT04ucGFyc2UoYXdhaXQgcmVhZEZpbGUoZXZlbnRSZWYsICd1dGYtOCcpKTtcbiAgICAgIGlmIChldmVudE1ldGFkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhgRXZlbnQgTWV0YWRhdGEgJHtldmVudE1ldGFkYXRhfWApO1xuICAgICAgICAvLyBUaGlzIGlzIGEgdW5mb3J0dW5hdGUgaGFjay5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FjdGlvbnMvY2hlY2tvdXQvaXNzdWVzLzU4XG4gICAgICAgIGNvbnN0IHB1bGxSZXF1ZXN0TnVtYmVyID0gZXZlbnRNZXRhZGF0YT8ucHVsbF9yZXF1ZXN0Py5udW1iZXI7XG4gICAgICAgIGlmIChwdWxsUmVxdWVzdE51bWJlcikge1xuICAgICAgICAgIHB1bGxSZXF1ZXN0VXJsID0gYGh0dHBzOi8vZ2l0aHViLmNvbS9hbmRyb2lkeC9hbmRyb2lkeC9wdWxsLyR7cHVsbFJlcXVlc3ROdW1iZXJ9YDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNlbmRlciA9IHdvcmtGbG93UGF5bG9kPy5zZW5kZXI/LmxvZ2luO1xuICAvLyBOb3RpZnkgYnVpbGQgZmFpbHVyZXMgaWYgaXRzIGNvcHliYXJhLWJvdCBtZXJnaW5nIHRoZSBjaGFuZ2VzLlxuICBjb25zdCBub3RpZnlPbkZhaWx1cmUgPSBzZW5kZXIgPT09ICdjb3B5YmFyYS1zZXJ2aWNlW2JvdF0nO1xuXG4gIGNvbnN0IGFkZGl0aW9uYWxQYXlsb2FkID0gSlNPTi5wYXJzZShwYXlsb2FkKTtcbiAgY29uc3QgcmVxdWVzdEJvZHkgPSB7XG4gICAgJ3dvcmtmbG93Jzogd29ya2Zsb3csXG4gICAgJ3JlcG8nOiByZXBvLFxuICAgICdyZWYnOiByZWYsXG4gICAgJ3NoYSc6IGhlYWRTaGEsXG4gICAgJ25vdGlmeU9uRmFpbHVyZSc6IG5vdGlmeU9uRmFpbHVyZSxcbiAgICAuLi5hZGRpdGlvbmFsUGF5bG9hZFxuICB9O1xuXG4gIGlmIChwdWxsUmVxdWVzdFVybCkge1xuICAgIHJlcXVlc3RCb2R5WydwdWxsUmVxdWVzdFVybCddID0gcHVsbFJlcXVlc3RVcmw7XG4gIH1cblxuICBjb3JlLmluZm8oYERlbGl2ZXJpbmcgJHtKU09OLnN0cmluZ2lmeShyZXF1ZXN0Qm9keSl9IHRvICR7dXJsfWApO1xuXG4gIGNvbnN0IHJlcXVlc3RDb25maWc6IEF4aW9zUmVxdWVzdENvbmZpZyA9IHtcbiAgICB1cmw6IHVybCxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBkYXRhOiByZXF1ZXN0Qm9keVxuICB9O1xuICBpZiAoc2VjcmV0KSB7XG4gICAgcmVxdWVzdENvbmZpZ1snaGVhZGVycyddID0ge1xuICAgICAgJ1gtR2l0SHViLVNlY3JldCc6IGAke3NlY3JldH1gXG4gICAgfVxuICB9XG4gIGNvbnN0IHJlc3BvbnNlID0gYXhpb3MocmVxdWVzdENvbmZpZyk7XG4gIHJldHVybiByZXNwb25zZTtcbn1cblxuKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB1cmwgPSBjb3JlLmdldElucHV0KCd1cmwnKTtcbiAgICBjb25zdCBzZWNyZXQgPSBjb3JlLmdldElucHV0KCdzZWNyZXQnKTtcbiAgICBjb25zdCBwYXlsb2FkID0gY29yZS5nZXRJbnB1dCgncGF5bG9hZCcpO1xuICAgIGNvcmUuaW5mbyhgTWFraW5nIGEgSFRUUCBQT1NUIHJlcXVlc3QgdG8gJHt1cmx9YCk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGVsaXZlcih1cmwsIHNlY3JldCwgcGF5bG9hZCk7XG4gICAgY29yZS5pbmZvKGBSZXN1bHQgJHtyZXN1bHQuc3RhdHVzfTogJHtyZXN1bHQuc3RhdHVzVGV4dH1gKTtcbiAgICBjb3JlLnNldE91dHB1dCgnc3RhdHVzJywgcmVzdWx0LnN0YXR1cyk7XG4gICAgY29yZS5zZXRPdXRwdXQoJ3N0YXR1c1RleHQnLCByZXN1bHQuc3RhdHVzVGV4dCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29yZS5zZXRGYWlsZWQoYFVuYWJsZSB0byBkZWxpdmVyIFdlYiBIb29rICR7ZXJyb3J9YCk7XG4gIH1cbn0pKCk7XG4iXX0=