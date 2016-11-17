#ifndef SRC_ADALBRIDGE_H_
#define SRC_ADALBRIDGE_H_

#include <string>

namespace ADALBridge {

std::string GetToken();
std::string GetTokenForUser(const std::string &userId);

} // namespace ADALBridge

#endif // SRC_ADALBRIDGE_H_
