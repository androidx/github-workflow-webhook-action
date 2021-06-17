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
var axios_1 = require("axios");
function deliver(url, secret, payload) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __awaiter(this, void 0, void 0, function () {
        var workflow, repo, ref, sha, workFlowPaylod, GITHUB_RUN_ID, contextUrl, targetWorkflowRun, headSha, sender, refFromTargetWorkflow, repoFromTargetWorkflow, notifyOnFailure, additionalPayload, requestBody, requestConfig, response;
        return __generator(this, function (_j) {
            workflow = github.context.workflow;
            repo = github.context.repo;
            ref = github.context.ref;
            sha = github.context.sha;
            workFlowPaylod = github.context.payload;
            GITHUB_RUN_ID = process.env.GITHUB_RUN_ID;
            contextUrl = null;
            // Log the actual github context for debugging
            core.info("GitHub Context " + JSON.stringify(github.context));
            if (GITHUB_RUN_ID) {
                contextUrl = "https://github.com/" + repo.owner + "/" + repo.repo + "/actions/runs/" + GITHUB_RUN_ID;
                core.info("GitHub Context " + contextUrl);
            }
            targetWorkflowRun = workFlowPaylod === null || workFlowPaylod === void 0 ? void 0 : workFlowPaylod.workflow_run;
            core.info("Target workflow run: " + JSON.stringify(targetWorkflowRun));
            headSha = (_d = (_c = (_b = (_a = workFlowPaylod === null || workFlowPaylod === void 0 ? void 0 : workFlowPaylod.pull_request) === null || _a === void 0 ? void 0 : _a.head) === null || _b === void 0 ? void 0 : _b.sha) !== null && _c !== void 0 ? _c : targetWorkflowRun === null || targetWorkflowRun === void 0 ? void 0 : targetWorkflowRun.head_sha) !== null && _d !== void 0 ? _d : sha;
            sender = (_e = workFlowPaylod === null || workFlowPaylod === void 0 ? void 0 : workFlowPaylod.sender) === null || _e === void 0 ? void 0 : _e.login;
            refFromTargetWorkflow = null;
            if (targetWorkflowRun === null || targetWorkflowRun === void 0 ? void 0 : targetWorkflowRun.head_branch) {
                refFromTargetWorkflow = "refs/heads/" + targetWorkflowRun.head_branch;
            }
            repoFromTargetWorkflow = null;
            if (((_g = (_f = targetWorkflowRun === null || targetWorkflowRun === void 0 ? void 0 : targetWorkflowRun.head_repository) === null || _f === void 0 ? void 0 : _f.owner) === null || _g === void 0 ? void 0 : _g.login) && ((_h = targetWorkflowRun === null || targetWorkflowRun === void 0 ? void 0 : targetWorkflowRun.head_repository) === null || _h === void 0 ? void 0 : _h.name)) {
                repoFromTargetWorkflow = {
                    "owner": targetWorkflowRun.head_repository.owner.login,
                    "repo": targetWorkflowRun.head_repository.name
                };
            }
            core.info("ref from workflow target: " + refFromTargetWorkflow);
            notifyOnFailure = sender === 'copybara-service[bot]';
            additionalPayload = JSON.parse(payload);
            requestBody = __assign({ 'workflow': workflow, 'repo': repoFromTargetWorkflow !== null && repoFromTargetWorkflow !== void 0 ? repoFromTargetWorkflow : repo, 'ref': refFromTargetWorkflow !== null && refFromTargetWorkflow !== void 0 ? refFromTargetWorkflow : ref, 'sha': headSha, 'notifyOnFailure': notifyOnFailure }, additionalPayload);
            if (contextUrl) {
                requestBody['pullRequestUrl'] = contextUrl;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9DQUF1QztBQUN2Qyx3Q0FBMkM7QUFDM0MsK0JBQWdFO0FBRWhFLFNBQWUsT0FBTyxDQUFDLEdBQVcsRUFBRSxNQUFjLEVBQUUsT0FBZTs7Ozs7WUFDM0QsUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQ25DLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUMzQixHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDekIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3pCLGNBQWMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUN0QyxhQUFhLEdBQUssT0FBTyxDQUFDLEdBQUcsY0FBaEIsQ0FBaUI7WUFDbEMsVUFBVSxHQUFrQixJQUFJLENBQUM7WUFFckMsOENBQThDO1lBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQWtCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBRyxDQUFDLENBQUM7WUFFOUQsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLFVBQVUsR0FBRyx3QkFBc0IsSUFBSSxDQUFDLEtBQUssU0FBSSxJQUFJLENBQUMsSUFBSSxzQkFBaUIsYUFBZSxDQUFDO2dCQUMzRixJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFrQixVQUFZLENBQUMsQ0FBQzthQUMzQztZQUVLLGlCQUFpQixHQUFHLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxZQUFZLENBQUE7WUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBd0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFB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QUssTUFBTSxDQUFDLFVBQVksQ0FBQyxDQUFDO29CQUMzRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7OztvQkFFaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQ0FBOEIsT0FBTyxDQUFDLENBQUM7Ozs7OztDQUV6RCxDQUFDLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5pbXBvcnQgY29yZSA9IHJlcXVpcmUoJ0BhY3Rpb25zL2NvcmUnKTtcbmltcG9ydCBnaXRodWIgPSByZXF1aXJlKCdAYWN0aW9ucy9naXRodWInKTtcbmltcG9ydCBheGlvcywgeyBBeGlvc1Byb21pc2UsIEF4aW9zUmVxdWVzdENvbmZpZyB9IGZyb20gJ2F4aW9zJztcblxuYXN5bmMgZnVuY3Rpb24gZGVsaXZlcih1cmw6IHN0cmluZywgc2VjcmV0OiBzdHJpbmcsIHBheWxvYWQ6IHN0cmluZyk6IFByb21pc2U8QXhpb3NQcm9taXNlPHt9Pj4ge1xuICBjb25zdCB3b3JrZmxvdyA9IGdpdGh1Yi5jb250ZXh0LndvcmtmbG93O1xuICBjb25zdCByZXBvID0gZ2l0aHViLmNvbnRleHQucmVwbztcbiAgY29uc3QgcmVmID0gZ2l0aHViLmNvbnRleHQucmVmO1xuICBjb25zdCBzaGEgPSBnaXRodWIuY29udGV4dC5zaGE7XG4gIGNvbnN0IHdvcmtGbG93UGF5bG9kID0gZ2l0aHViLmNvbnRleHQucGF5bG9hZDtcbiAgY29uc3QgeyBHSVRIVUJfUlVOX0lEIH0gPSBwcm9jZXNzLmVudjtcbiAgbGV0IGNvbnRleHRVcmw6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIC8vIExvZyB0aGUgYWN0dWFsIGdpdGh1YiBjb250ZXh0IGZvciBkZWJ1Z2dpbmdcbiAgY29yZS5pbmZvKGBHaXRIdWIgQ29udGV4dCAke0pTT04uc3RyaW5naWZ5KGdpdGh1Yi5jb250ZXh0KX1gKTtcblxuICBpZiAoR0lUSFVCX1JVTl9JRCkge1xuICAgIGNvbnRleHRVcmwgPSBgaHR0cHM6Ly9naXRodWIuY29tLyR7cmVwby5vd25lcn0vJHtyZXBvLnJlcG99L2FjdGlvbnMvcnVucy8ke0dJVEhVQl9SVU5fSUR9YDtcbiAgICBjb3JlLmluZm8oYEdpdEh1YiBDb250ZXh0ICR7Y29udGV4dFVybH1gKTtcbiAgfVxuICAvLyBJZiB0aGlzIHdvcmtmbG93IGlzIHRyaWdnZXJlZCBieSBhbm90aGVyIHdvcmtmbG93LCB1c2UgdGhhdCBydW4ncyBwYXJhbWV0ZXJzXG4gIGNvbnN0IHRhcmdldFdvcmtmbG93UnVuID0gd29ya0Zsb3dQYXlsb2Q/LndvcmtmbG93X3J1blxuICBjb3JlLmluZm8oYFRhcmdldCB3b3JrZmxvdyBydW46ICR7SlNPTi5zdHJpbmdpZnkodGFyZ2V0V29ya2Zsb3dSdW4pfWApXG4gIGNvbnN0IGhlYWRTaGEgPSB3b3JrRmxvd1BheWxvZD8ucHVsbF9yZXF1ZXN0Py5oZWFkPy5zaGEgPz8gdGFyZ2V0V29ya2Zsb3dSdW4/LmhlYWRfc2hhID8/IHNoYTtcbiAgY29uc3Qgc2VuZGVyID0gd29ya0Zsb3dQYXlsb2Q/LnNlbmRlcj8ubG9naW47XG4gIGxldCByZWZGcm9tVGFyZ2V0V29ya2Zsb3c6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAodGFyZ2V0V29ya2Zsb3dSdW4/LmhlYWRfYnJhbmNoKSB7XG4gICAgcmVmRnJvbVRhcmdldFdvcmtmbG93ID0gYHJlZnMvaGVhZHMvJHt0YXJnZXRXb3JrZmxvd1J1bi5oZWFkX2JyYW5jaH1gXG4gIH1cblxuICBsZXQgcmVwb0Zyb21UYXJnZXRXb3JrZmxvdzogb2JqZWN0IHwgbnVsbCA9IG51bGw7XG4gIGlmICh0YXJnZXRXb3JrZmxvd1J1bj8uaGVhZF9yZXBvc2l0b3J5Py5vd25lcj8ubG9naW4gJiZcbiAgICB0YXJnZXRXb3JrZmxvd1J1bj8uaGVhZF9yZXBvc2l0b3J5Py5uYW1lKSB7XG4gICAgcmVwb0Zyb21UYXJnZXRXb3JrZmxvdyA9IHtcbiAgICAgIFwib3duZXJcIjogdGFyZ2V0V29ya2Zsb3dSdW4uaGVhZF9yZXBvc2l0b3J5Lm93bmVyLmxvZ2luLFxuICAgICAgXCJyZXBvXCI6IHRhcmdldFdvcmtmbG93UnVuLmhlYWRfcmVwb3NpdG9yeS5uYW1lXG4gICAgfVxuICB9XG4gIGNvcmUuaW5mbyhgcmVmIGZyb20gd29ya2Zsb3cgdGFyZ2V0OiAke3JlZkZyb21UYXJnZXRXb3JrZmxvd31gKVxuICAvLyBOb3RpZnkgYnVpbGQgZmFpbHVyZXMgaWYgaXRzIGNvcHliYXJhLWJvdCBtZXJnaW5nIHRoZSBjaGFuZ2VzLlxuICBjb25zdCBub3RpZnlPbkZhaWx1cmUgPSBzZW5kZXIgPT09ICdjb3B5YmFyYS1zZXJ2aWNlW2JvdF0nO1xuXG4gIGNvbnN0IGFkZGl0aW9uYWxQYXlsb2FkID0gSlNPTi5wYXJzZShwYXlsb2FkKTtcbiAgY29uc3QgcmVxdWVzdEJvZHkgPSB7XG4gICAgJ3dvcmtmbG93Jzogd29ya2Zsb3csXG4gICAgJ3JlcG8nOiByZXBvRnJvbVRhcmdldFdvcmtmbG93ID8/IHJlcG8sXG4gICAgJ3JlZic6IHJlZkZyb21UYXJnZXRXb3JrZmxvdyA/PyByZWYsXG4gICAgJ3NoYSc6IGhlYWRTaGEsXG4gICAgJ25vdGlmeU9uRmFpbHVyZSc6IG5vdGlmeU9uRmFpbHVyZSxcbiAgICAuLi5hZGRpdGlvbmFsUGF5bG9hZFxuICB9O1xuXG4gIGlmIChjb250ZXh0VXJsKSB7XG4gICAgcmVxdWVzdEJvZHlbJ3B1bGxSZXF1ZXN0VXJsJ10gPSBjb250ZXh0VXJsO1xuICB9XG5cbiAgY29yZS5pbmZvKGBEZWxpdmVyaW5nICR7SlNPTi5zdHJpbmdpZnkocmVxdWVzdEJvZHkpfSB0byAke3VybH1gKTtcblxuICBjb25zdCByZXF1ZXN0Q29uZmlnOiBBeGlvc1JlcXVlc3RDb25maWcgPSB7XG4gICAgdXJsOiB1cmwsXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgZGF0YTogcmVxdWVzdEJvZHlcbiAgfTtcbiAgaWYgKHNlY3JldCkge1xuICAgIHJlcXVlc3RDb25maWdbJ2hlYWRlcnMnXSA9IHtcbiAgICAgICdYLUdpdEh1Yi1TZWNyZXQnOiBgJHtzZWNyZXR9YFxuICAgIH1cbiAgfVxuICBjb25zdCByZXNwb25zZSA9IGF4aW9zKHJlcXVlc3RDb25maWcpO1xuICByZXR1cm4gcmVzcG9uc2U7XG59XG5cbihhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdXJsID0gY29yZS5nZXRJbnB1dCgndXJsJyk7XG4gICAgY29uc3Qgc2VjcmV0ID0gY29yZS5nZXRJbnB1dCgnc2VjcmV0Jyk7XG4gICAgY29uc3QgcGF5bG9hZCA9IGNvcmUuZ2V0SW5wdXQoJ3BheWxvYWQnKTtcbiAgICBjb3JlLmluZm8oYE1ha2luZyBhIEhUVFAgUE9TVCByZXF1ZXN0IHRvICR7dXJsfWApO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRlbGl2ZXIodXJsLCBzZWNyZXQsIHBheWxvYWQpO1xuICAgIGNvcmUuaW5mbyhgUmVzdWx0ICR7cmVzdWx0LnN0YXR1c306ICR7cmVzdWx0LnN0YXR1c1RleHR9YCk7XG4gICAgY29yZS5zZXRPdXRwdXQoJ3N0YXR1cycsIHJlc3VsdC5zdGF0dXMpO1xuICAgIGNvcmUuc2V0T3V0cHV0KCdzdGF0dXNUZXh0JywgcmVzdWx0LnN0YXR1c1RleHQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvcmUuc2V0RmFpbGVkKGBVbmFibGUgdG8gZGVsaXZlciBXZWIgSG9vayAke2Vycm9yfWApO1xuICB9XG59KSgpO1xuIl19