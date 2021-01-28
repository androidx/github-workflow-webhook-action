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
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var workflow, repo, owner, ref, sha, workFlowPaylod, GITHUB_RUN_ID, contextUrl, headSha, sender, notifyOnFailure, additionalPayload, requestBody, requestConfig, response;
        return __generator(this, function (_e) {
            workflow = github.context.workflow;
            repo = github.context.repo;
            owner = github.context.repo.owner;
            ref = github.context.ref;
            sha = github.context.sha;
            workFlowPaylod = github.context.payload;
            GITHUB_RUN_ID = process.env.GITHUB_RUN_ID;
            contextUrl = null;
            // Log the actual github context for debugging
            core.info("GitHub Context " + JSON.stringify(github.context));
            if (GITHUB_RUN_ID) {
                contextUrl = "https://github.com/" + owner + "/" + repo + "/runs/" + GITHUB_RUN_ID;
                core.info("GitHub Context " + contextUrl);
            }
            headSha = (_c = (_b = (_a = workFlowPaylod === null || workFlowPaylod === void 0 ? void 0 : workFlowPaylod.pull_request) === null || _a === void 0 ? void 0 : _a.head) === null || _b === void 0 ? void 0 : _b.sha) !== null && _c !== void 0 ? _c : sha;
            sender = (_d = workFlowPaylod === null || workFlowPaylod === void 0 ? void 0 : workFlowPaylod.sender) === null || _d === void 0 ? void 0 : _d.login;
            notifyOnFailure = sender === 'copybara-service[bot]';
            additionalPayload = JSON.parse(payload);
            requestBody = __assign({ 'workflow': workflow, 'repo': repo, 'ref': ref, 'sha': headSha, 'notifyOnFailure': notifyOnFailure }, additionalPayload);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9DQUF1QztBQUN2Qyx3Q0FBMkM7QUFDM0MsK0JBQWdFO0FBRWhFLFNBQWUsT0FBTyxDQUFDLEdBQVcsRUFBRSxNQUFjLEVBQUUsT0FBZTs7Ozs7WUFDM0QsUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQ25DLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUMzQixLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2xDLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUN6QixHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDekIsY0FBYyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ3RDLGFBQWEsR0FBSyxPQUFPLENBQUMsR0FBRyxjQUFoQixDQUFpQjtZQUNsQyxVQUFVLEdBQWtCLElBQUksQ0FBQztZQUVyQyw4Q0FBOEM7WUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBa0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFHLENBQUMsQ0FBQztZQUU5RCxJQUFJLGFBQWEsRUFBRTtnQkFDakIsVUFBVSxHQUFHLHdCQUFzQixLQUFLLFNBQUksSUFBSSxjQUFTLGFBQWUsQ0FBQztnQkFDekUsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBa0IsVUFBWSxDQUFDLENBQUM7YUFDM0M7WUFFSyxPQUFPLHFCQUFHLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxZQUFZLDBDQUFFLElBQUksMENBQUUsR0FBRyxtQ0FBSSxHQUFHLENBQUM7WUFDekQsTUFBTSxTQUFHLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxNQUFNLDBDQUFFLEtBQUssQ0FBQztZQUV2QyxlQUFlLEdBQUcsTUFBTSxLQUFLLHVCQUF1QixDQUFDO1lBRXJELGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEMsV0FBVyxjQUNmLFVBQVUsRUFBRSxRQUFRLEVBQ3BCLE1BQU0sRUFBRSxJQUFJLEVBQ1osS0FBSyxFQUFFLEdBQUcsRUFDVixLQUFLLEVBQUUsT0FBTyxFQUNkLGlCQUFpQixFQUFFLGVBQWUsSUFDL0IsaUJBQWlCLENBQ3JCLENBQUM7WUFFRixJQUFJLFVBQVUsRUFBRTtnQkFDZCxXQUFXLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxVQUFVLENBQUM7YUFDNUM7WUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFjLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFlBQU8sR0FBSyxDQUFDLENBQUM7WUFFM0QsYUFBYSxHQUF1QjtnQkFDeEMsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsSUFBSSxFQUFFLFdBQVc7YUFDbEIsQ0FBQztZQUNGLElBQUksTUFBTSxFQUFFO2dCQUNWLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRztvQkFDekIsaUJBQWlCLEVBQUUsS0FBRyxNQUFRO2lCQUMvQixDQUFBO2FBQ0Y7WUFDSyxRQUFRLEdBQUcsZUFBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3RDLHNCQUFPLFFBQVEsRUFBQzs7O0NBQ2pCO0FBRUQsQ0FBQzs7Ozs7OztvQkFFUyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDM0IsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2pDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLG1DQUFpQyxHQUFLLENBQUMsQ0FBQztvQkFDbkMscUJBQU0sT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUE7O29CQUE1QyxNQUFNLEdBQUcsU0FBbUM7b0JBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBVSxNQUFNLENBQUMsTUFBTSxVQUFLLE1BQU0sQ0FBQyxVQUFZLENBQUMsQ0FBQztvQkFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7Ozs7b0JBRWhELElBQUksQ0FBQyxTQUFTLENBQUMsZ0NBQThCLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7Q0FFekQsQ0FBQyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgPSByZXF1aXJlKCdmcycpO1xuaW1wb3J0IGNvcmUgPSByZXF1aXJlKCdAYWN0aW9ucy9jb3JlJyk7XG5pbXBvcnQgZ2l0aHViID0gcmVxdWlyZSgnQGFjdGlvbnMvZ2l0aHViJyk7XG5pbXBvcnQgYXhpb3MsIHsgQXhpb3NQcm9taXNlLCBBeGlvc1JlcXVlc3RDb25maWcgfSBmcm9tICdheGlvcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIGRlbGl2ZXIodXJsOiBzdHJpbmcsIHNlY3JldDogc3RyaW5nLCBwYXlsb2FkOiBzdHJpbmcpOiBQcm9taXNlPEF4aW9zUHJvbWlzZTx7fT4+IHtcbiAgY29uc3Qgd29ya2Zsb3cgPSBnaXRodWIuY29udGV4dC53b3JrZmxvdztcbiAgY29uc3QgcmVwbyA9IGdpdGh1Yi5jb250ZXh0LnJlcG87XG4gIGNvbnN0IG93bmVyID0gZ2l0aHViLmNvbnRleHQucmVwby5vd25lcjtcbiAgY29uc3QgcmVmID0gZ2l0aHViLmNvbnRleHQucmVmO1xuICBjb25zdCBzaGEgPSBnaXRodWIuY29udGV4dC5zaGE7XG4gIGNvbnN0IHdvcmtGbG93UGF5bG9kID0gZ2l0aHViLmNvbnRleHQucGF5bG9hZDtcbiAgY29uc3QgeyBHSVRIVUJfUlVOX0lEIH0gPSBwcm9jZXNzLmVudjtcbiAgbGV0IGNvbnRleHRVcmw6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIC8vIExvZyB0aGUgYWN0dWFsIGdpdGh1YiBjb250ZXh0IGZvciBkZWJ1Z2dpbmdcbiAgY29yZS5pbmZvKGBHaXRIdWIgQ29udGV4dCAke0pTT04uc3RyaW5naWZ5KGdpdGh1Yi5jb250ZXh0KX1gKTtcblxuICBpZiAoR0lUSFVCX1JVTl9JRCkge1xuICAgIGNvbnRleHRVcmwgPSBgaHR0cHM6Ly9naXRodWIuY29tLyR7b3duZXJ9LyR7cmVwb30vcnVucy8ke0dJVEhVQl9SVU5fSUR9YDtcbiAgICBjb3JlLmluZm8oYEdpdEh1YiBDb250ZXh0ICR7Y29udGV4dFVybH1gKTtcbiAgfVxuXG4gIGNvbnN0IGhlYWRTaGEgPSB3b3JrRmxvd1BheWxvZD8ucHVsbF9yZXF1ZXN0Py5oZWFkPy5zaGEgPz8gc2hhO1xuICBjb25zdCBzZW5kZXIgPSB3b3JrRmxvd1BheWxvZD8uc2VuZGVyPy5sb2dpbjtcbiAgLy8gTm90aWZ5IGJ1aWxkIGZhaWx1cmVzIGlmIGl0cyBjb3B5YmFyYS1ib3QgbWVyZ2luZyB0aGUgY2hhbmdlcy5cbiAgY29uc3Qgbm90aWZ5T25GYWlsdXJlID0gc2VuZGVyID09PSAnY29weWJhcmEtc2VydmljZVtib3RdJztcblxuICBjb25zdCBhZGRpdGlvbmFsUGF5bG9hZCA9IEpTT04ucGFyc2UocGF5bG9hZCk7XG4gIGNvbnN0IHJlcXVlc3RCb2R5ID0ge1xuICAgICd3b3JrZmxvdyc6IHdvcmtmbG93LFxuICAgICdyZXBvJzogcmVwbyxcbiAgICAncmVmJzogcmVmLFxuICAgICdzaGEnOiBoZWFkU2hhLFxuICAgICdub3RpZnlPbkZhaWx1cmUnOiBub3RpZnlPbkZhaWx1cmUsXG4gICAgLi4uYWRkaXRpb25hbFBheWxvYWRcbiAgfTtcblxuICBpZiAoY29udGV4dFVybCkge1xuICAgIHJlcXVlc3RCb2R5WydwdWxsUmVxdWVzdFVybCddID0gY29udGV4dFVybDtcbiAgfVxuXG4gIGNvcmUuaW5mbyhgRGVsaXZlcmluZyAke0pTT04uc3RyaW5naWZ5KHJlcXVlc3RCb2R5KX0gdG8gJHt1cmx9YCk7XG5cbiAgY29uc3QgcmVxdWVzdENvbmZpZzogQXhpb3NSZXF1ZXN0Q29uZmlnID0ge1xuICAgIHVybDogdXJsLFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGRhdGE6IHJlcXVlc3RCb2R5XG4gIH07XG4gIGlmIChzZWNyZXQpIHtcbiAgICByZXF1ZXN0Q29uZmlnWydoZWFkZXJzJ10gPSB7XG4gICAgICAnWC1HaXRIdWItU2VjcmV0JzogYCR7c2VjcmV0fWBcbiAgICB9XG4gIH1cbiAgY29uc3QgcmVzcG9uc2UgPSBheGlvcyhyZXF1ZXN0Q29uZmlnKTtcbiAgcmV0dXJuIHJlc3BvbnNlO1xufVxuXG4oYXN5bmMgZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHVybCA9IGNvcmUuZ2V0SW5wdXQoJ3VybCcpO1xuICAgIGNvbnN0IHNlY3JldCA9IGNvcmUuZ2V0SW5wdXQoJ3NlY3JldCcpO1xuICAgIGNvbnN0IHBheWxvYWQgPSBjb3JlLmdldElucHV0KCdwYXlsb2FkJyk7XG4gICAgY29yZS5pbmZvKGBNYWtpbmcgYSBIVFRQIFBPU1QgcmVxdWVzdCB0byAke3VybH1gKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkZWxpdmVyKHVybCwgc2VjcmV0LCBwYXlsb2FkKTtcbiAgICBjb3JlLmluZm8oYFJlc3VsdCAke3Jlc3VsdC5zdGF0dXN9OiAke3Jlc3VsdC5zdGF0dXNUZXh0fWApO1xuICAgIGNvcmUuc2V0T3V0cHV0KCdzdGF0dXMnLCByZXN1bHQuc3RhdHVzKTtcbiAgICBjb3JlLnNldE91dHB1dCgnc3RhdHVzVGV4dCcsIHJlc3VsdC5zdGF0dXNUZXh0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb3JlLnNldEZhaWxlZChgVW5hYmxlIHRvIGRlbGl2ZXIgV2ViIEhvb2sgJHtlcnJvcn1gKTtcbiAgfVxufSkoKTtcbiJdfQ==