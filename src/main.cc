#include "adal_bridge.h"
#include <nan.h>
#include <string>

using namespace v8;

namespace {

NAN_METHOD(GetToken) {
  std::string token = ADALBridge::GetToken();
  Local<String> res = Nan::New(token).ToLocalChecked();
  info.GetReturnValue().Set(res);
}

NAN_METHOD(GetTokenForUser) {
  std::string userId = *Nan::Utf8String(info[0]->ToString());
  std::string token = ADALBridge::GetTokenForUser(userId);
  Local<String> res = Nan::New(token).ToLocalChecked();
  info.GetReturnValue().Set(res);
}

NAN_MODULE_INIT(Init) {
  Nan::Set(
      target, Nan::New<String>("getToken").ToLocalChecked(),
      Nan::GetFunction(Nan::New<FunctionTemplate>(GetToken)).ToLocalChecked());

  Nan::Set(
      target, Nan::New<String>("getTokenForUser").ToLocalChecked(),
      Nan::GetFunction(Nan::New<FunctionTemplate>(GetTokenForUser)).ToLocalChecked());
}

} // namespace

NODE_MODULE(ADALBridge, Init)
