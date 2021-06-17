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
            core.info("ref from workflow target: " + refFromTargetWorkflow);
            repoFromTargetWorkflow = null;
            if (((_g = (_f = targetWorkflowRun === null || targetWorkflowRun === void 0 ? void 0 : targetWorkflowRun.head_repository) === null || _f === void 0 ? void 0 : _f.owner) === null || _g === void 0 ? void 0 : _g.login) && ((_h = targetWorkflowRun === null || targetWorkflowRun === void 0 ? void 0 : targetWorkflowRun.head_repository) === null || _h === void 0 ? void 0 : _h.name)) {
                repoFromTargetWorkflow = {
                    "owner": targetWorkflowRun.head_repository.owner.login,
                    "repo": targetWorkflowRun.head_repository.name
                };
            }
            core.info("repo from workflow target: " + repoFromTargetWorkflow);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9DQUF1QztBQUN2Qyx3Q0FBMkM7QUFDM0MsK0JBQWdFO0FBT2hFLFNBQWUsT0FBTyxDQUFDLEdBQVcsRUFBRSxNQUFjLEVBQUUsT0FBZTs7Ozs7WUFDM0QsUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQ25DLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUMzQixHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDekIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3pCLGNBQWMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUN0QyxhQUFhLEdBQUssT0FBTyxDQUFDLEdBQUcsY0FBaEIsQ0FBaUI7WUFDbEMsVUFBVSxHQUFrQixJQUFJLENBQUM7WUFFckMsOENBQThDO1lBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQWtCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBRyxDQUFDLENBQUM7WUFFOUQsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLFVBQVUsR0FBRyx3QkFBc0IsSUFBSSxDQUFDLEtBQUssU0FBSSxJQUFJLENBQUMsSUFBSSxzQkFBaUIsYUFBZSxDQUFDO2dCQUMzRixJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFrQixVQUFZLENBQUMsQ0FBQzthQUMzQztZQUVLLGlCQUFpQixHQUFHLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxZQUFZLENBQUE7WUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBd0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFB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O29CQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVUsTUFBTSxDQUFDLE1BQU0sVUFBSyxNQUFNLENBQUMsVUFBWSxDQUFDLENBQUM7b0JBQzNELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7O29CQUVoRCxJQUFJLENBQUMsU0FBUyxDQUFDLGdDQUE4QixPQUFPLENBQUMsQ0FBQzs7Ozs7O0NBRXpELENBQUMsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmltcG9ydCBjb3JlID0gcmVxdWlyZSgnQGFjdGlvbnMvY29yZScpO1xuaW1wb3J0IGdpdGh1YiA9IHJlcXVpcmUoJ0BhY3Rpb25zL2dpdGh1YicpO1xuaW1wb3J0IGF4aW9zLCB7IEF4aW9zUHJvbWlzZSwgQXhpb3NSZXF1ZXN0Q29uZmlnIH0gZnJvbSAnYXhpb3MnO1xuXG5pbnRlcmZhY2UgUmVwbyB7XG4gIHJlcG86IHN0cmluZztcbiAgb3duZXI6IHN0cmluZztcbn1cblxuYXN5bmMgZnVuY3Rpb24gZGVsaXZlcih1cmw6IHN0cmluZywgc2VjcmV0OiBzdHJpbmcsIHBheWxvYWQ6IHN0cmluZyk6IFByb21pc2U8QXhpb3NQcm9taXNlPHt9Pj4ge1xuICBjb25zdCB3b3JrZmxvdyA9IGdpdGh1Yi5jb250ZXh0LndvcmtmbG93O1xuICBjb25zdCByZXBvID0gZ2l0aHViLmNvbnRleHQucmVwbztcbiAgY29uc3QgcmVmID0gZ2l0aHViLmNvbnRleHQucmVmO1xuICBjb25zdCBzaGEgPSBnaXRodWIuY29udGV4dC5zaGE7XG4gIGNvbnN0IHdvcmtGbG93UGF5bG9kID0gZ2l0aHViLmNvbnRleHQucGF5bG9hZDtcbiAgY29uc3QgeyBHSVRIVUJfUlVOX0lEIH0gPSBwcm9jZXNzLmVudjtcbiAgbGV0IGNvbnRleHRVcmw6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIC8vIExvZyB0aGUgYWN0dWFsIGdpdGh1YiBjb250ZXh0IGZvciBkZWJ1Z2dpbmdcbiAgY29yZS5pbmZvKGBHaXRIdWIgQ29udGV4dCAke0pTT04uc3RyaW5naWZ5KGdpdGh1Yi5jb250ZXh0KX1gKTtcblxuICBpZiAoR0lUSFVCX1JVTl9JRCkge1xuICAgIGNvbnRleHRVcmwgPSBgaHR0cHM6Ly9naXRodWIuY29tLyR7cmVwby5vd25lcn0vJHtyZXBvLnJlcG99L2FjdGlvbnMvcnVucy8ke0dJVEhVQl9SVU5fSUR9YDtcbiAgICBjb3JlLmluZm8oYEdpdEh1YiBDb250ZXh0ICR7Y29udGV4dFVybH1gKTtcbiAgfVxuICAvLyBJZiB0aGlzIHdvcmtmbG93IGlzIHRyaWdnZXJlZCBieSBhbm90aGVyIHdvcmtmbG93LCB1c2UgdGhhdCBydW4ncyBwYXJhbWV0ZXJzXG4gIGNvbnN0IHRhcmdldFdvcmtmbG93UnVuID0gd29ya0Zsb3dQYXlsb2Q/LndvcmtmbG93X3J1blxuICBjb3JlLmluZm8oYFRhcmdldCB3b3JrZmxvdyBydW46ICR7SlNPTi5zdHJpbmdpZnkodGFyZ2V0V29ya2Zsb3dSdW4pfWApXG4gIGNvbnN0IGhlYWRTaGEgPSB3b3JrRmxvd1BheWxvZD8ucHVsbF9yZXF1ZXN0Py5oZWFkPy5zaGEgPz8gdGFyZ2V0V29ya2Zsb3dSdW4/LmhlYWRfc2hhID8/IHNoYTtcbiAgY29uc3Qgc2VuZGVyID0gd29ya0Zsb3dQYXlsb2Q/LnNlbmRlcj8ubG9naW47XG4gIGxldCByZWZGcm9tVGFyZ2V0V29ya2Zsb3c6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAodGFyZ2V0V29ya2Zsb3dSdW4/LmhlYWRfYnJhbmNoKSB7XG4gICAgcmVmRnJvbVRhcmdldFdvcmtmbG93ID0gYHJlZnMvaGVhZHMvJHt0YXJnZXRXb3JrZmxvd1J1bi5oZWFkX2JyYW5jaH1gXG4gIH1cbiAgY29yZS5pbmZvKGByZWYgZnJvbSB3b3JrZmxvdyB0YXJnZXQ6ICR7cmVmRnJvbVRhcmdldFdvcmtmbG93fWApXG5cbiAgbGV0IHJlcG9Gcm9tVGFyZ2V0V29ya2Zsb3c6IFJlcG8gfCBudWxsID0gbnVsbDtcbiAgaWYgKHRhcmdldFdvcmtmbG93UnVuPy5oZWFkX3JlcG9zaXRvcnk/Lm93bmVyPy5sb2dpbiAmJlxuICAgIHRhcmdldFdvcmtmbG93UnVuPy5oZWFkX3JlcG9zaXRvcnk/Lm5hbWUpIHtcbiAgICByZXBvRnJvbVRhcmdldFdvcmtmbG93ID0ge1xuICAgICAgXCJvd25lclwiOiB0YXJnZXRXb3JrZmxvd1J1bi5oZWFkX3JlcG9zaXRvcnkub3duZXIubG9naW4sXG4gICAgICBcInJlcG9cIjogdGFyZ2V0V29ya2Zsb3dSdW4uaGVhZF9yZXBvc2l0b3J5Lm5hbWVcbiAgICB9XG4gIH1cbiAgY29yZS5pbmZvKGByZXBvIGZyb20gd29ya2Zsb3cgdGFyZ2V0OiAke3JlcG9Gcm9tVGFyZ2V0V29ya2Zsb3d9YClcbiAgLy8gTm90aWZ5IGJ1aWxkIGZhaWx1cmVzIGlmIGl0cyBjb3B5YmFyYS1ib3QgbWVyZ2luZyB0aGUgY2hhbmdlcy5cbiAgY29uc3Qgbm90aWZ5T25GYWlsdXJlID0gc2VuZGVyID09PSAnY29weWJhcmEtc2VydmljZVtib3RdJztcblxuICBjb25zdCBhZGRpdGlvbmFsUGF5bG9hZCA9IEpTT04ucGFyc2UocGF5bG9hZCk7XG4gIGNvbnN0IHJlcXVlc3RCb2R5ID0ge1xuICAgICd3b3JrZmxvdyc6IHdvcmtmbG93LFxuICAgICdyZXBvJzogcmVwb0Zyb21UYXJnZXRXb3JrZmxvdyA/PyByZXBvLFxuICAgICdyZWYnOiByZWZGcm9tVGFyZ2V0V29ya2Zsb3cgPz8gcmVmLFxuICAgICdzaGEnOiBoZWFkU2hhLFxuICAgICdub3RpZnlPbkZhaWx1cmUnOiBub3RpZnlPbkZhaWx1cmUsXG4gICAgLi4uYWRkaXRpb25hbFBheWxvYWRcbiAgfTtcblxuICBpZiAoY29udGV4dFVybCkge1xuICAgIHJlcXVlc3RCb2R5WydwdWxsUmVxdWVzdFVybCddID0gY29udGV4dFVybDtcbiAgfVxuXG4gIGNvcmUuaW5mbyhgRGVsaXZlcmluZyAke0pTT04uc3RyaW5naWZ5KHJlcXVlc3RCb2R5KX0gdG8gJHt1cmx9YCk7XG5cbiAgY29uc3QgcmVxdWVzdENvbmZpZzogQXhpb3NSZXF1ZXN0Q29uZmlnID0ge1xuICAgIHVybDogdXJsLFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGRhdGE6IHJlcXVlc3RCb2R5XG4gIH07XG4gIGlmIChzZWNyZXQpIHtcbiAgICByZXF1ZXN0Q29uZmlnWydoZWFkZXJzJ10gPSB7XG4gICAgICAnWC1HaXRIdWItU2VjcmV0JzogYCR7c2VjcmV0fWBcbiAgICB9XG4gIH1cbiAgY29uc3QgcmVzcG9uc2UgPSBheGlvcyhyZXF1ZXN0Q29uZmlnKTtcbiAgcmV0dXJuIHJlc3BvbnNlO1xufVxuXG4oYXN5bmMgZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHVybCA9IGNvcmUuZ2V0SW5wdXQoJ3VybCcpO1xuICAgIGNvbnN0IHNlY3JldCA9IGNvcmUuZ2V0SW5wdXQoJ3NlY3JldCcpO1xuICAgIGNvbnN0IHBheWxvYWQgPSBjb3JlLmdldElucHV0KCdwYXlsb2FkJyk7XG4gICAgY29yZS5pbmZvKGBNYWtpbmcgYSBIVFRQIFBPU1QgcmVxdWVzdCB0byAke3VybH1gKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkZWxpdmVyKHVybCwgc2VjcmV0LCBwYXlsb2FkKTtcbiAgICBjb3JlLmluZm8oYFJlc3VsdCAke3Jlc3VsdC5zdGF0dXN9OiAke3Jlc3VsdC5zdGF0dXNUZXh0fWApO1xuICAgIGNvcmUuc2V0T3V0cHV0KCdzdGF0dXMnLCByZXN1bHQuc3RhdHVzKTtcbiAgICBjb3JlLnNldE91dHB1dCgnc3RhdHVzVGV4dCcsIHJlc3VsdC5zdGF0dXNUZXh0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb3JlLnNldEZhaWxlZChgVW5hYmxlIHRvIGRlbGl2ZXIgV2ViIEhvb2sgJHtlcnJvcn1gKTtcbiAgfVxufSkoKTtcbiJdfQ==