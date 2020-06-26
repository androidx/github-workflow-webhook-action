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
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var workflow, repo, ref, sha, workFlowPaylod, pullRequestUrl, additionalPayload, requestBody, requestConfig, response;
        return __generator(this, function (_b) {
            workflow = github.context.workflow;
            repo = github.context.repo;
            ref = github.context.ref;
            sha = github.context.sha;
            workFlowPaylod = github.context.payload;
            // Log the actual workflow payload for debugging
            core.debug("Workflow payload " + JSON.stringify(workFlowPaylod));
            pullRequestUrl = (_a = workFlowPaylod === null || workFlowPaylod === void 0 ? void 0 : workFlowPaylod.pull_request) === null || _a === void 0 ? void 0 : _a.html_url;
            additionalPayload = JSON.parse(payload);
            requestBody = __assign({ 'workflow': workflow, 'repo': repo, 'ref': ref, 'sha': sha }, additionalPayload);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9DQUF1QztBQUN2Qyx3Q0FBMkM7QUFDM0MsK0JBQWdFO0FBRWhFLFNBQWUsT0FBTyxDQUFDLEdBQVcsRUFBRSxNQUFjLEVBQUUsT0FBZTs7Ozs7WUFDM0QsUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQ25DLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUMzQixHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDekIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3pCLGNBQWMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUU5QyxnREFBZ0Q7WUFDaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBb0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUcsQ0FBQyxDQUFDO1lBRTNELGNBQWMsU0FBRyxjQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsWUFBWSwwQ0FBRSxRQUFRLENBQUM7WUFDeEQsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4QyxXQUFXLGNBQ2YsVUFBVSxFQUFFLFFBQVEsRUFDcEIsTUFBTSxFQUFFLElBQUksRUFDWixLQUFLLEVBQUUsR0FBRyxFQUNWLEtBQUssRUFBRSxHQUFHLElBQ1AsaUJBQWlCLENBQ3JCLENBQUM7WUFFRixJQUFJLGNBQWMsRUFBRTtnQkFDbEIsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsY0FBYyxDQUFDO2FBQ2hEO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBYyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxZQUFPLEdBQUssQ0FBQyxDQUFDO1lBRTNELGFBQWEsR0FBdUI7Z0JBQ3hDLEdBQUcsRUFBRSxHQUFHO2dCQUNSLE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxXQUFXO2FBQ2xCLENBQUM7WUFDRixJQUFJLE1BQU0sRUFBRTtnQkFDVixhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUc7b0JBQ3pCLGlCQUFpQixFQUFFLEtBQUcsTUFBUTtpQkFDL0IsQ0FBQTthQUNGO1lBQ0ssUUFBUSxHQUFHLGVBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN0QyxzQkFBTyxRQUFRLEVBQUM7OztDQUNqQjtBQUVELENBQUM7Ozs7Ozs7b0JBRVMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzNCLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNqQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQ0FBaUMsR0FBSyxDQUFDLENBQUM7b0JBQ25DLHFCQUFNLE9BQU8sQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxFQUFBOztvQkFBNUMsTUFBTSxHQUFHLFNBQW1DO29CQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVUsTUFBTSxDQUFDLE1BQU0sVUFBSyxNQUFNLENBQUMsVUFBWSxDQUFDLENBQUM7b0JBQzNELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7O29CQUVoRCxJQUFJLENBQUMsU0FBUyxDQUFDLGdDQUE4QixPQUFPLENBQUMsQ0FBQzs7Ozs7O0NBRXpELENBQUMsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvcmUgPSByZXF1aXJlKCdAYWN0aW9ucy9jb3JlJyk7XG5pbXBvcnQgZ2l0aHViID0gcmVxdWlyZSgnQGFjdGlvbnMvZ2l0aHViJyk7XG5pbXBvcnQgYXhpb3MsIHsgQXhpb3NQcm9taXNlLCBBeGlvc1JlcXVlc3RDb25maWcgfSBmcm9tICdheGlvcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIGRlbGl2ZXIodXJsOiBzdHJpbmcsIHNlY3JldDogc3RyaW5nLCBwYXlsb2FkOiBzdHJpbmcpOiBQcm9taXNlPEF4aW9zUHJvbWlzZTx7fT4+IHtcbiAgY29uc3Qgd29ya2Zsb3cgPSBnaXRodWIuY29udGV4dC53b3JrZmxvdztcbiAgY29uc3QgcmVwbyA9IGdpdGh1Yi5jb250ZXh0LnJlcG87XG4gIGNvbnN0IHJlZiA9IGdpdGh1Yi5jb250ZXh0LnJlZjtcbiAgY29uc3Qgc2hhID0gZ2l0aHViLmNvbnRleHQuc2hhO1xuICBjb25zdCB3b3JrRmxvd1BheWxvZCA9IGdpdGh1Yi5jb250ZXh0LnBheWxvYWQ7XG5cbiAgLy8gTG9nIHRoZSBhY3R1YWwgd29ya2Zsb3cgcGF5bG9hZCBmb3IgZGVidWdnaW5nXG4gIGNvcmUuZGVidWcoYFdvcmtmbG93IHBheWxvYWQgJHtKU09OLnN0cmluZ2lmeSh3b3JrRmxvd1BheWxvZCl9YCk7XG5cbiAgY29uc3QgcHVsbFJlcXVlc3RVcmwgPSB3b3JrRmxvd1BheWxvZD8ucHVsbF9yZXF1ZXN0Py5odG1sX3VybDtcbiAgY29uc3QgYWRkaXRpb25hbFBheWxvYWQgPSBKU09OLnBhcnNlKHBheWxvYWQpO1xuICBjb25zdCByZXF1ZXN0Qm9keSA9IHtcbiAgICAnd29ya2Zsb3cnOiB3b3JrZmxvdyxcbiAgICAncmVwbyc6IHJlcG8sXG4gICAgJ3JlZic6IHJlZixcbiAgICAnc2hhJzogc2hhLFxuICAgIC4uLmFkZGl0aW9uYWxQYXlsb2FkXG4gIH07XG5cbiAgaWYgKHB1bGxSZXF1ZXN0VXJsKSB7XG4gICAgcmVxdWVzdEJvZHlbJ3B1bGxSZXF1ZXN0VXJsJ10gPSBwdWxsUmVxdWVzdFVybDtcbiAgfVxuXG4gIGNvcmUuaW5mbyhgRGVsaXZlcmluZyAke0pTT04uc3RyaW5naWZ5KHJlcXVlc3RCb2R5KX0gdG8gJHt1cmx9YCk7XG5cbiAgY29uc3QgcmVxdWVzdENvbmZpZzogQXhpb3NSZXF1ZXN0Q29uZmlnID0ge1xuICAgIHVybDogdXJsLFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGRhdGE6IHJlcXVlc3RCb2R5XG4gIH07XG4gIGlmIChzZWNyZXQpIHtcbiAgICByZXF1ZXN0Q29uZmlnWydoZWFkZXJzJ10gPSB7XG4gICAgICAnWC1HaXRIdWItU2VjcmV0JzogYCR7c2VjcmV0fWBcbiAgICB9XG4gIH1cbiAgY29uc3QgcmVzcG9uc2UgPSBheGlvcyhyZXF1ZXN0Q29uZmlnKTtcbiAgcmV0dXJuIHJlc3BvbnNlO1xufVxuXG4oYXN5bmMgZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHVybCA9IGNvcmUuZ2V0SW5wdXQoJ3VybCcpO1xuICAgIGNvbnN0IHNlY3JldCA9IGNvcmUuZ2V0SW5wdXQoJ3NlY3JldCcpO1xuICAgIGNvbnN0IHBheWxvYWQgPSBjb3JlLmdldElucHV0KCdwYXlsb2FkJyk7XG4gICAgY29yZS5pbmZvKGBNYWtpbmcgYSBIVFRQIFBPU1QgcmVxdWVzdCB0byAke3VybH1gKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkZWxpdmVyKHVybCwgc2VjcmV0LCBwYXlsb2FkKTtcbiAgICBjb3JlLmluZm8oYFJlc3VsdCAke3Jlc3VsdC5zdGF0dXN9OiAke3Jlc3VsdC5zdGF0dXNUZXh0fWApO1xuICAgIGNvcmUuc2V0T3V0cHV0KCdzdGF0dXMnLCByZXN1bHQuc3RhdHVzKTtcbiAgICBjb3JlLnNldE91dHB1dCgnc3RhdHVzVGV4dCcsIHJlc3VsdC5zdGF0dXNUZXh0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb3JlLnNldEZhaWxlZChgVW5hYmxlIHRvIGRlbGl2ZXIgV2ViIEhvb2sgJHtlcnJvcn1gKTtcbiAgfVxufSkoKTtcbiJdfQ==